import {TLInt128} from "../TL/Types/TLInt128";
import {Session} from "./Session";
import {RSAPublicKeyStore} from "../RSA/RSAPublicKeyStore";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {MTProto} from "../Codegen/MTProto/MTProtoSchema";
import {TLBytes} from "../TL/Types/TLBytes";
import {RSAPublicKey} from "../RSA/RSAPublicKey";
import {BN} from "bn.js";
import {factorize} from "../BrentPollardRho/BrentPollardRho";
import {TLInt256} from "../TL/Types/TLInt256";
import {sha1} from "../SHA/SHA";
import {concat} from "../Utils/BytesConcat";
import {TLLong} from "../TL/Types/TLLong";
import {ByteStream} from "../DataStructures/ByteStream";
import * as Long from "long";
import {SecureRandom} from "../SecureRandom/SecureRandom";
import {IGE} from "../AES/IGE";
import {TLInt} from "../TL/Types/TLInt";
import {Subject} from "rxjs/Subject";

export class AuthKeyGenerator {
    static readonly temporaryKeyExpiresIn = 60 * 60;
    private readonly state = new Subject<State>();

    private nonce: TLInt128;
    private serverNonce: TLInt128;
    private pq: TLBytes;
    private rsaKey: RSAPublicKey;
    private p: TLBytes;
    private q: TLBytes;
    private newNonce: TLInt256;
    private encryptedAnswer: TLBytes;
    private ige: IGE;
    private tmpIV: Uint8Array;
    private g: number;
    private dhPrime: Uint8Array;
    private gA: Uint8Array;
    private timeDifference: number;
    private dhRetryId = new TLLong(Long.ZERO);

    private authKey: Uint8Array;
    private serverSalt: Uint8Array;

    private observer: Observer<{
        key: Uint8Array, salt: Uint8Array, timeDiff: number}>;

    constructor(
        readonly session: Session,
        readonly rsaPublicKeyStore: RSAPublicKeyStore,
        readonly temporary: boolean) {
        this.state.subscribe(state => {
            switch (state) {
                case State.Unauthorized:
                    this.observer.error(new Error());
                    this.observer.complete();
                    break;

                case State.RequestPQ:
                    this.requestPQ();
                    break;

                case State.FactorizePQ:
                    this.factorizePQ();
                    break;

                case State.RequestDHParams:
                    this.requestDhParams();
                    break;

                case State.ServerDHParamsOK:
                    this.decryptServerDhParams();
                    break;

                case State.CheckServerDHParams:
                    this.checkServerDHParams();
                    break;

                case State.SetClientDHParams:
                    this.setClientDHParams();
                    break;

                case State.Authorized:
                    this.observer.next({
                        key: this.authKey,
                        salt: this.serverSalt,
                        timeDiff: this.timeDifference
                    });
                    this.observer.complete();
                    break;
            }
        });
    }

    generate(): Observable<{key: Uint8Array, salt: Uint8Array, timeDiff: number}> {
        return new Observable(observer => {
            this.observer = observer;
            this.state.next(State.RequestPQ);
        });
    }

    private requestPQ() {
        this.nonce = new TLInt128(SecureRandom.bytes(16));
        this.session.send(new MTProto.ReqPq(this.nonce), response => {
            if (!(response instanceof MTProto.ResPQ)) {
                this.state.next(State.Unauthorized);
                return;
            }
            if (!this.nonce.equals(response.nonce)) {
                this.state.next(State.Unauthorized);
                return;
            }
            const key = this.rsaPublicKeyStore.key(
                response.serverPublicKeyFingerprints.items[0]);
            if (!key) {
                this.state.next(State.Unauthorized);
                return;
            }

            this.serverNonce = response.serverNonce;
            this.pq = response.pq;
            this.rsaKey = key;

            this.state.next(State.FactorizePQ);
        });
    }

    private factorizePQ() {
        const pq = new BN(this.pq.bytes);
        const p = factorize(pq);
        if (p) {
            const q = pq.div(p);
            if (p.lt(q)) {
                this.p = new TLBytes(p.toArrayLike(Uint8Array));
                this.q = new TLBytes(q.toArrayLike(Uint8Array));
            } else {
                this.p = new TLBytes(q.toArrayLike(Uint8Array));
                this.q = new TLBytes(p.toArrayLike(Uint8Array));
            }
            this.state.next(State.RequestDHParams);
        } else {
            this.state.next(State.Unauthorized);
        }
    }

    private requestDhParams() {
        this.newNonce = new TLInt256(SecureRandom.bytes(32));
        let pqInnerData: Uint8Array;
        if (this.temporary) {
            pqInnerData = new MTProto.PQInnerDataTemp(
                this.pq,
                this.p,
                this.q,
                this.nonce,
                this.serverNonce,
                this.newNonce,
                new TLInt(AuthKeyGenerator.temporaryKeyExpiresIn)).serialized();
        } else {
            pqInnerData = new MTProto.PQInnerData(
                this.pq,
                this.p,
                this.q,
                this.nonce,
                this.serverNonce,
                this.newNonce).serialized();
        }
        const hash = sha1(pqInnerData);
        const encryptedData = this.rsaKey.encrypt(concat(hash, pqInnerData));

        const reqDhParams = new MTProto.ReqDHParams(
            this.nonce,
            this.serverNonce,
            this.p,
            this.q,
            new TLLong(this.rsaKey.fingerprint),
            new TLBytes(encryptedData));

        this.session.send(reqDhParams, response => {
            if (!(response instanceof MTProto.ServerDHParamsOk)) {
                this.state.next(State.Unauthorized);
                return;
            }
            if (!response.nonce.equals(this.nonce) ||
                !response.serverNonce.equals(this.serverNonce)) {
                this.state.next(State.Unauthorized);
                return;
            }

            this.encryptedAnswer = response.encryptedAnswer;
            this.state.next(State.ServerDHParamsOK);
        });
    }

    private decryptServerDhParams() {
        const serverNonce = this.serverNonce.value;
        const newNonce = this.newNonce.value;

        const tmpKey = concat(
            sha1(concat(newNonce, serverNonce)),
            sha1(concat(serverNonce, newNonce)).slice(0, 12),
        );

        this.ige = new IGE(tmpKey.buffer);
        this.tmpIV = concat(
            sha1(concat(serverNonce, newNonce)).slice(12,),
            sha1(concat(newNonce, newNonce)),
            newNonce.slice(0, 4)
        );

        const decrypted = this.ige.decrypt(
            this.encryptedAnswer.bytes.buffer, this.tmpIV.buffer);

        const answerWithHash = new ByteStream(new Uint8Array(decrypted));
        const hash = answerWithHash.read(20);
        if (!hash) {
            this.state.next(State.Unauthorized);
            return;
        }

        const cursorBeforeAnswer = answerWithHash.cursor;
        const answer = MTProto.ServerDHInnerData.deserialized(answerWithHash);
        if (!answer) {
            this.state.next(State.Unauthorized);
            return;
        }

        const answerBytes = answerWithHash.bytes.slice(
            cursorBeforeAnswer, answerWithHash.cursor);
        if (!eql(sha1(answerBytes), hash)) {
            this.state.next(State.Unauthorized);
            return;
        }

        if (!answer.nonce.equals(this.nonce) ||
            !answer.serverNonce.equals(this.serverNonce)) {
            this.state.next(State.Unauthorized);
            return;
        }

        this.g = answer.g.value;
        this.dhPrime = answer.dhPrime.bytes;
        this.gA = answer.gA.bytes;
        this.timeDifference = Date.now() - (answer.serverTime.value * 1000);

        this.state.next(State.CheckServerDHParams);
    }

    private checkServerDHParams() {
        const p = dhPairs[this.g];
        if (!p) {
            console.log("No pre-checked dhPrime for g found");
            this.state.next(State.Unauthorized);
            return;
        }

        if (!eql(p, this.dhPrime)) {
            this.state.next(State.Unauthorized);
            return;
        }

        this.state.next(State.SetClientDHParams);
    }

    private setClientDHParams() {
        const dhPrime = new BN(this.dhPrime);
        const gA = new BN(this.gA);

        const lower = new BN(1).ishln(2048 - 64);
        const upper = dhPrime.sub(lower);

        if (gA.lte(lower) || gA.gte(upper)) {
            this.state.next(State.Unauthorized);
            return;
        }

        const redCtx = BN.mont(dhPrime);
        const g = new BN(this.g).toRed(redCtx);
        const b = new BN(SecureRandom.bytes(256));
        const gB = g.redPow(b).fromRed();

        if (gB.lte(lower) || gB.gte(upper)) {
            this.state.next(State.Unauthorized);
            return;
        }

        const gBbytes = new TLBytes(gB.toArrayLike(Uint8Array));
        const data = new MTProto.ClientDHInnerData(
            this.nonce,
            this.serverNonce,
            this.dhRetryId,
            gBbytes).serialized();
        const dataWithHash = concat(sha1(data), data);
        const encryptedData = new TLBytes(new Uint8Array(
            this.ige.encrypt(dataWithHash.buffer, this.tmpIV.buffer)));
        const setClientDHParams = new MTProto.SetClientDHParams(
            this.nonce,
            this.serverNonce,
            encryptedData);

        this.authKey = gA
            .toRed(redCtx)
            .redPow(b)
            .fromRed()
            .toArrayLike(Uint8Array);
        this.session.send(setClientDHParams, response => {
            const authKeyAux = sha1(this.authKey).slice(0, 8);
            if (response instanceof MTProto.DhGenOk) {
                const newNonceHash1 = sha1(concat(
                    this.newNonce.value, new Uint8Array([1]), authKeyAux))
                    .slice(4,);
                if (!eql(response.newNonceHash1.value, newNonceHash1)) {
                    this.state.next(State.Unauthorized);
                    return;
                }
                this.serverSalt = xor(
                    this.newNonce.value.slice(0, 8),
                    this.serverNonce.value.slice(0, 8));

                this.state.next(State.Authorized);
            } else if (response instanceof MTProto.DhGenRetry) {
                const newNonceHash2 = sha1(concat(
                    this.newNonce.value, new Uint8Array([2]), authKeyAux))
                    .slice(4,);
                if (!eql(response.newNonceHash2.value, newNonceHash2)) {
                    this.state.next(State.Unauthorized);
                    return;
                }
                this.dhRetryId = TLLong.deserialized(
                    new ByteStream(authKeyAux))!;

                this.state.next(State.SetClientDHParams);
            } else {
                this.state.next(State.Unauthorized);
            }
        });
    }
}

enum State {
    Unauthorized,
    RequestPQ,
    FactorizePQ,
    RequestDHParams,
    ServerDHParamsOK,
    CheckServerDHParams,
    SetClientDHParams,
    Authorized,
}

/**
 * Known verified DH pairs (g, p) where g is the generator and p is a 2048 bit
 * safe prime number that are used by the server.
 *
 * While one can verify that p is a safe prime efficiently on a desktop using
 * the highly optimized GMP library, it's not viable in the browser, so we
 * store pre-checked values here.
 */
const dhPairs: { [index: number] : number[] } = {
    3: [0xc7, 0x1c, 0xae, 0xb9, 0xc6, 0xb1, 0xc9, 0x04,
        0x8e, 0x6c, 0x52, 0x2f, 0x70, 0xf1, 0x3f, 0x73,
        0x98, 0x0d, 0x40, 0x23, 0x8e, 0x3e, 0x21, 0xc1,
        0x49, 0x34, 0xd0, 0x37, 0x56, 0x3d, 0x93, 0x0f,
        0x48, 0x19, 0x8a, 0x0a, 0xa7, 0xc1, 0x40, 0x58,
        0x22, 0x94, 0x93, 0xd2, 0x25, 0x30, 0xf4, 0xdb,
        0xfa, 0x33, 0x6f, 0x6e, 0x0a, 0xc9, 0x25, 0x13,
        0x95, 0x43, 0xae, 0xd4, 0x4c, 0xce, 0x7c, 0x37,
        0x20, 0xfd, 0x51, 0xf6, 0x94, 0x58, 0x70, 0x5a,
        0xc6, 0x8c, 0xd4, 0xfe, 0x6b, 0x6b, 0x13, 0xab,
        0xdc, 0x97, 0x46, 0x51, 0x29, 0x69, 0x32, 0x84,
        0x54, 0xf1, 0x8f, 0xaf, 0x8c, 0x59, 0x5f, 0x64,
        0x24, 0x77, 0xfe, 0x96, 0xbb, 0x2a, 0x94, 0x1d,
        0x5b, 0xcd, 0x1d, 0x4a, 0xc8, 0xcc, 0x49, 0x88,
        0x07, 0x08, 0xfa, 0x9b, 0x37, 0x8e, 0x3c, 0x4f,
        0x3a, 0x90, 0x60, 0xbe, 0xe6, 0x7c, 0xf9, 0xa4,
        0xa4, 0xa6, 0x95, 0x81, 0x10, 0x51, 0x90, 0x7e,
        0x16, 0x27, 0x53, 0xb5, 0x6b, 0x0f, 0x6b, 0x41,
        0x0d, 0xba, 0x74, 0xd8, 0xa8, 0x4b, 0x2a, 0x14,
        0xb3, 0x14, 0x4e, 0x0e, 0xf1, 0x28, 0x47, 0x54,
        0xfd, 0x17, 0xed, 0x95, 0x0d, 0x59, 0x65, 0xb4,
        0xb9, 0xdd, 0x46, 0x58, 0x2d, 0xb1, 0x17, 0x8d,
        0x16, 0x9c, 0x6b, 0xc4, 0x65, 0xb0, 0xd6, 0xff,
        0x9c, 0xa3, 0x92, 0x8f, 0xef, 0x5b, 0x9a, 0xe4,
        0xe4, 0x18, 0xfc, 0x15, 0xe8, 0x3e, 0xbe, 0xa0,
        0xf8, 0x7f, 0xa9, 0xff, 0x5e, 0xed, 0x70, 0x05,
        0x0d, 0xed, 0x28, 0x49, 0xf4, 0x7b, 0xf9, 0x59,
        0xd9, 0x56, 0x85, 0x0c, 0xe9, 0x29, 0x85, 0x1f,
        0x0d, 0x81, 0x15, 0xf6, 0x35, 0xb1, 0x05, 0xee,
        0x2e, 0x4e, 0x15, 0xd0, 0x4b, 0x24, 0x54, 0xbf,
        0x6f, 0x4f, 0xad, 0xf0, 0x34, 0xb1, 0x04, 0x03,
        0x11, 0x9c, 0xd8, 0xe3, 0xb9, 0x2f, 0xcc, 0x5b],
};

const eql = <T>(lhs: ArrayLike<T>, rhs: ArrayLike<T>): boolean => {
    if (lhs.length !== rhs.length) {
        return false;
    }

    for (let i = 0; i < lhs.length; i++) {
        if (lhs[i] !== rhs[i]) {
            return false;
        }
    }

    return true;
};

const xor = (lhs: Uint8Array, rhs: Uint8Array): Uint8Array => {
    if (lhs.length !== rhs.length) {
        throw new RangeError();
    }

    let result = new Uint8Array(lhs.length);
    for (let i = 0; i < lhs.length; i++) {
        result[i] = lhs[i] ^ rhs[i];
    }

    return result;
};
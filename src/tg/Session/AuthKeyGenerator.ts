import {TLInt128} from "../TL/Types/TLInt128";
import {SecureRandom} from "../SecureRandom/SecureRandom";
import {Session} from "./Session";
import {RSAPublicKeyStore} from "../RSA/RSAPublicKeyStore";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {MTProto} from "../Codegen/MTProto/MTProtoSchema";
import {TLBytes} from "../TL/Types/TLBytes";
import {RSAPublicKey} from "../RSA/RSAPublicKey";
import {BN} from "bn.js";

export class AuthKeyGenerator {
    private state = new Observable<State>(observer => {
        this.stateObserver = observer;
    });
    private stateObserver: Observer<State>;
    private nonce: TLInt128;
    private serverNonce: TLInt128;
    private pq: TLBytes;
    private rsaKey: RSAPublicKey;

    constructor(
        readonly session: Session,
        readonly rsaPublicKeyStore: RSAPublicKeyStore) {
        this.state.subscribe(state => {
            switch (state) {
                case State.Unauthorized:
                    break;

                case State.RequestPQ:
                    this.requestPQ();
                    break;

                case State.FactorizePQ:
                    this.factorizePQ();
                    break;

                case State.RequestDHParams:
                    break;

                case State.ServerDHParamsOK:
                    break;

                case State.CheckServerDHParams:
                    break;

                case State.SetClientDHParams:
                    break;

                case State.Authorized:
                    break;
            }
        });
    }

    generate() {
        this.stateObserver.next(State.RequestPQ);
    }

    private requestPQ() {
        this.nonce = new TLInt128(SecureRandom.bytes(16));
        this.session.send(new MTProto.ReqPq(this.nonce), (result) => {
            if (!(result instanceof MTProto.ResPQ)) {
                this.stateObserver.next(State.Unauthorized);
                return;
            }
            if (!this.nonce.equals(result.nonce)) {
                this.stateObserver.next(State.Unauthorized);
                return;
            }
            const key = this.rsaPublicKeyStore.key(
                result.serverPublicKeyFingerprints.array[0]);
            if (!key) {
                this.stateObserver.next(State.Unauthorized);
                return;
            }

            this.serverNonce = result.serverNonce;
            this.pq = result.pq;
            this.rsaKey = key;

            this.stateObserver.next(State.FactorizePQ);
        });
    }

    private factorizePQ() {
        const pq = new BN(this.pq.bytes);
        console.log(pq.toString());
        // console.log(factorize(pq));
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
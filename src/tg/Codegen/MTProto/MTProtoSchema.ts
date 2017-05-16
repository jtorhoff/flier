
import {HashMap} from "../../DataStructures/HashMap/HashMap";
import {ByteStream} from "../../DataStructures/ByteStream";

import {TLBytes} from "../../TL/Types/TLBytes";
import {TLInt} from "../../TL/Types/TLInt";
import {TLInt128} from "../../TL/Types/TLInt128";
import {TLInt256} from "../../TL/Types/TLInt256";
import {TLLong} from "../../TL/Types/TLLong";
import {TLString} from "../../TL/Types/TLString";
import {TLVector} from "../../TL/Types/TLVector";

import {TLObject} from "../../TL/Interfaces/TLObject";
import {TLFunction} from "../../TL/Interfaces/TLFunction";

import {concat} from "../../TL/BytesConcat";
import {deserializedObject} from "../../TL/TLObjectDeserializer";

export namespace MTProto {
    type PQInnerDataType = PQInnerData | PQInnerDataTemp;
    type ServerDHParamsType = ServerDHParamsFail | ServerDHParamsOk;
    type SetClientDHParamsAnswerType = DhGenOk | DhGenRetry | DhGenFail;
    type RpcDropAnswerType = RpcAnswerUnknown | RpcAnswerDroppedRunning | RpcAnswerDropped;
    type DestroySessionResType = DestroySessionOk | DestroySessionNone;
    type BadMsgNotificationType = BadMsgNotification | BadServerSalt;
    type MsgDetailedInfoType = MsgDetailedInfo | MsgNewDetailedInfo;

    export class ResPQ implements TLObject {
        static readonly cons = new TLInt(0x05162463);
    
        static deserialized(data: ByteStream): ResPQ | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const nonce = TLInt128.deserialized(data);
            if (!nonce) return undefined;
    
            const serverNonce = TLInt128.deserialized(data);
            if (!serverNonce) return undefined;
    
            const pq = TLBytes.deserialized(data);
            if (!pq) return undefined;
    
            const serverPublicKeyFingerprints = TLVector.deserialized(data, TLLong) as TLVector<TLLong>;
            if (!serverPublicKeyFingerprints) return undefined;
    
            return new ResPQ(
                nonce,
                serverNonce,
                pq,
                serverPublicKeyFingerprints)
        }
    
        serialized(): Uint8Array {
            const constructor = ResPQ.cons.serialized();
            const nonce = this.nonce.serialized();
            const serverNonce = this.serverNonce.serialized();
            const pq = this.pq.serialized();
            const serverPublicKeyFingerprints = this.serverPublicKeyFingerprints.serialized();
    
            return concat(constructor, nonce, serverNonce, pq, serverPublicKeyFingerprints);
        }
    
        constructor(
            readonly nonce: TLInt128,
            readonly serverNonce: TLInt128,
            readonly pq: TLBytes,
            readonly serverPublicKeyFingerprints: TLVector<TLLong>) {}
    }

    export class PQInnerData implements TLObject {
        static readonly cons = new TLInt(0x83c95aec);
    
        static deserialized(data: ByteStream): PQInnerData | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const pq = TLBytes.deserialized(data);
            if (!pq) return undefined;
    
            const p = TLBytes.deserialized(data);
            if (!p) return undefined;
    
            const q = TLBytes.deserialized(data);
            if (!q) return undefined;
    
            const nonce = TLInt128.deserialized(data);
            if (!nonce) return undefined;
    
            const serverNonce = TLInt128.deserialized(data);
            if (!serverNonce) return undefined;
    
            const newNonce = TLInt256.deserialized(data);
            if (!newNonce) return undefined;
    
            return new PQInnerData(
                pq,
                p,
                q,
                nonce,
                serverNonce,
                newNonce)
        }
    
        serialized(): Uint8Array {
            const constructor = PQInnerData.cons.serialized();
            const pq = this.pq.serialized();
            const p = this.p.serialized();
            const q = this.q.serialized();
            const nonce = this.nonce.serialized();
            const serverNonce = this.serverNonce.serialized();
            const newNonce = this.newNonce.serialized();
    
            return concat(constructor, pq, p, q, nonce, serverNonce, newNonce);
        }
    
        constructor(
            readonly pq: TLBytes,
            readonly p: TLBytes,
            readonly q: TLBytes,
            readonly nonce: TLInt128,
            readonly serverNonce: TLInt128,
            readonly newNonce: TLInt256) {}
    }

    export class PQInnerDataTemp implements TLObject {
        static readonly cons = new TLInt(0x3c6a84d4);
    
        static deserialized(data: ByteStream): PQInnerDataTemp | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const pq = TLBytes.deserialized(data);
            if (!pq) return undefined;
    
            const p = TLBytes.deserialized(data);
            if (!p) return undefined;
    
            const q = TLBytes.deserialized(data);
            if (!q) return undefined;
    
            const nonce = TLInt128.deserialized(data);
            if (!nonce) return undefined;
    
            const serverNonce = TLInt128.deserialized(data);
            if (!serverNonce) return undefined;
    
            const newNonce = TLInt256.deserialized(data);
            if (!newNonce) return undefined;
    
            const expiresIn = TLInt.deserialized(data);
            if (!expiresIn) return undefined;
    
            return new PQInnerDataTemp(
                pq,
                p,
                q,
                nonce,
                serverNonce,
                newNonce,
                expiresIn)
        }
    
        serialized(): Uint8Array {
            const constructor = PQInnerDataTemp.cons.serialized();
            const pq = this.pq.serialized();
            const p = this.p.serialized();
            const q = this.q.serialized();
            const nonce = this.nonce.serialized();
            const serverNonce = this.serverNonce.serialized();
            const newNonce = this.newNonce.serialized();
            const expiresIn = this.expiresIn.serialized();
    
            return concat(constructor, pq, p, q, nonce, serverNonce, newNonce, expiresIn);
        }
    
        constructor(
            readonly pq: TLBytes,
            readonly p: TLBytes,
            readonly q: TLBytes,
            readonly nonce: TLInt128,
            readonly serverNonce: TLInt128,
            readonly newNonce: TLInt256,
            readonly expiresIn: TLInt) {}
    }

    export class ServerDHParamsFail implements TLObject {
        static readonly cons = new TLInt(0x79cb045d);
    
        static deserialized(data: ByteStream): ServerDHParamsFail | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const nonce = TLInt128.deserialized(data);
            if (!nonce) return undefined;
    
            const serverNonce = TLInt128.deserialized(data);
            if (!serverNonce) return undefined;
    
            const newNonceHash = TLInt128.deserialized(data);
            if (!newNonceHash) return undefined;
    
            return new ServerDHParamsFail(
                nonce,
                serverNonce,
                newNonceHash)
        }
    
        serialized(): Uint8Array {
            const constructor = ServerDHParamsFail.cons.serialized();
            const nonce = this.nonce.serialized();
            const serverNonce = this.serverNonce.serialized();
            const newNonceHash = this.newNonceHash.serialized();
    
            return concat(constructor, nonce, serverNonce, newNonceHash);
        }
    
        constructor(
            readonly nonce: TLInt128,
            readonly serverNonce: TLInt128,
            readonly newNonceHash: TLInt128) {}
    }

    export class ServerDHParamsOk implements TLObject {
        static readonly cons = new TLInt(0xd0e8075c);
    
        static deserialized(data: ByteStream): ServerDHParamsOk | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const nonce = TLInt128.deserialized(data);
            if (!nonce) return undefined;
    
            const serverNonce = TLInt128.deserialized(data);
            if (!serverNonce) return undefined;
    
            const encryptedAnswer = TLBytes.deserialized(data);
            if (!encryptedAnswer) return undefined;
    
            return new ServerDHParamsOk(
                nonce,
                serverNonce,
                encryptedAnswer)
        }
    
        serialized(): Uint8Array {
            const constructor = ServerDHParamsOk.cons.serialized();
            const nonce = this.nonce.serialized();
            const serverNonce = this.serverNonce.serialized();
            const encryptedAnswer = this.encryptedAnswer.serialized();
    
            return concat(constructor, nonce, serverNonce, encryptedAnswer);
        }
    
        constructor(
            readonly nonce: TLInt128,
            readonly serverNonce: TLInt128,
            readonly encryptedAnswer: TLBytes) {}
    }

    export class ServerDHInnerData implements TLObject {
        static readonly cons = new TLInt(0xb5890dba);
    
        static deserialized(data: ByteStream): ServerDHInnerData | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const nonce = TLInt128.deserialized(data);
            if (!nonce) return undefined;
    
            const serverNonce = TLInt128.deserialized(data);
            if (!serverNonce) return undefined;
    
            const g = TLInt.deserialized(data);
            if (!g) return undefined;
    
            const dhPrime = TLBytes.deserialized(data);
            if (!dhPrime) return undefined;
    
            const gA = TLBytes.deserialized(data);
            if (!gA) return undefined;
    
            const serverTime = TLInt.deserialized(data);
            if (!serverTime) return undefined;
    
            return new ServerDHInnerData(
                nonce,
                serverNonce,
                g,
                dhPrime,
                gA,
                serverTime)
        }
    
        serialized(): Uint8Array {
            const constructor = ServerDHInnerData.cons.serialized();
            const nonce = this.nonce.serialized();
            const serverNonce = this.serverNonce.serialized();
            const g = this.g.serialized();
            const dhPrime = this.dhPrime.serialized();
            const gA = this.gA.serialized();
            const serverTime = this.serverTime.serialized();
    
            return concat(constructor, nonce, serverNonce, g, dhPrime, gA, serverTime);
        }
    
        constructor(
            readonly nonce: TLInt128,
            readonly serverNonce: TLInt128,
            readonly g: TLInt,
            readonly dhPrime: TLBytes,
            readonly gA: TLBytes,
            readonly serverTime: TLInt) {}
    }

    export class ClientDHInnerData implements TLObject {
        static readonly cons = new TLInt(0x6643b654);
    
        static deserialized(data: ByteStream): ClientDHInnerData | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const nonce = TLInt128.deserialized(data);
            if (!nonce) return undefined;
    
            const serverNonce = TLInt128.deserialized(data);
            if (!serverNonce) return undefined;
    
            const retryId = TLLong.deserialized(data);
            if (!retryId) return undefined;
    
            const gB = TLBytes.deserialized(data);
            if (!gB) return undefined;
    
            return new ClientDHInnerData(
                nonce,
                serverNonce,
                retryId,
                gB)
        }
    
        serialized(): Uint8Array {
            const constructor = ClientDHInnerData.cons.serialized();
            const nonce = this.nonce.serialized();
            const serverNonce = this.serverNonce.serialized();
            const retryId = this.retryId.serialized();
            const gB = this.gB.serialized();
    
            return concat(constructor, nonce, serverNonce, retryId, gB);
        }
    
        constructor(
            readonly nonce: TLInt128,
            readonly serverNonce: TLInt128,
            readonly retryId: TLLong,
            readonly gB: TLBytes) {}
    }

    export class DhGenOk implements TLObject {
        static readonly cons = new TLInt(0x3bcbf734);
    
        static deserialized(data: ByteStream): DhGenOk | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const nonce = TLInt128.deserialized(data);
            if (!nonce) return undefined;
    
            const serverNonce = TLInt128.deserialized(data);
            if (!serverNonce) return undefined;
    
            const newNonceHash1 = TLInt128.deserialized(data);
            if (!newNonceHash1) return undefined;
    
            return new DhGenOk(
                nonce,
                serverNonce,
                newNonceHash1)
        }
    
        serialized(): Uint8Array {
            const constructor = DhGenOk.cons.serialized();
            const nonce = this.nonce.serialized();
            const serverNonce = this.serverNonce.serialized();
            const newNonceHash1 = this.newNonceHash1.serialized();
    
            return concat(constructor, nonce, serverNonce, newNonceHash1);
        }
    
        constructor(
            readonly nonce: TLInt128,
            readonly serverNonce: TLInt128,
            readonly newNonceHash1: TLInt128) {}
    }

    export class DhGenRetry implements TLObject {
        static readonly cons = new TLInt(0x46dc1fb9);
    
        static deserialized(data: ByteStream): DhGenRetry | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const nonce = TLInt128.deserialized(data);
            if (!nonce) return undefined;
    
            const serverNonce = TLInt128.deserialized(data);
            if (!serverNonce) return undefined;
    
            const newNonceHash2 = TLInt128.deserialized(data);
            if (!newNonceHash2) return undefined;
    
            return new DhGenRetry(
                nonce,
                serverNonce,
                newNonceHash2)
        }
    
        serialized(): Uint8Array {
            const constructor = DhGenRetry.cons.serialized();
            const nonce = this.nonce.serialized();
            const serverNonce = this.serverNonce.serialized();
            const newNonceHash2 = this.newNonceHash2.serialized();
    
            return concat(constructor, nonce, serverNonce, newNonceHash2);
        }
    
        constructor(
            readonly nonce: TLInt128,
            readonly serverNonce: TLInt128,
            readonly newNonceHash2: TLInt128) {}
    }

    export class DhGenFail implements TLObject {
        static readonly cons = new TLInt(0xa69dae02);
    
        static deserialized(data: ByteStream): DhGenFail | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const nonce = TLInt128.deserialized(data);
            if (!nonce) return undefined;
    
            const serverNonce = TLInt128.deserialized(data);
            if (!serverNonce) return undefined;
    
            const newNonceHash3 = TLInt128.deserialized(data);
            if (!newNonceHash3) return undefined;
    
            return new DhGenFail(
                nonce,
                serverNonce,
                newNonceHash3)
        }
    
        serialized(): Uint8Array {
            const constructor = DhGenFail.cons.serialized();
            const nonce = this.nonce.serialized();
            const serverNonce = this.serverNonce.serialized();
            const newNonceHash3 = this.newNonceHash3.serialized();
    
            return concat(constructor, nonce, serverNonce, newNonceHash3);
        }
    
        constructor(
            readonly nonce: TLInt128,
            readonly serverNonce: TLInt128,
            readonly newNonceHash3: TLInt128) {}
    }

    export class RpcResult implements TLObject {
        static readonly cons = new TLInt(0xf35c6d01);
    
        static deserialized(data: ByteStream): RpcResult | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const reqMsgId = TLLong.deserialized(data);
            if (!reqMsgId) return undefined;
    
            const result = data;
    
            return new RpcResult(
                reqMsgId,
                result)
        }
    
        serialized(): Uint8Array {
            const constructor = RpcResult.cons.serialized();
            const reqMsgId = this.reqMsgId.serialized();
            const result = this.result.bytes.slice(this.result.cursor);
    
            return concat(constructor, reqMsgId, result);
        }
    
        constructor(
            readonly reqMsgId: TLLong,
            readonly result: ByteStream) {}
    }

    export class RpcError implements TLObject {
        static readonly cons = new TLInt(0x2144ca19);
    
        static deserialized(data: ByteStream): RpcError | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const errorCode = TLInt.deserialized(data);
            if (!errorCode) return undefined;
    
            const errorMessage = TLString.deserialized(data);
            if (!errorMessage) return undefined;
    
            return new RpcError(
                errorCode,
                errorMessage)
        }
    
        serialized(): Uint8Array {
            const constructor = RpcError.cons.serialized();
            const errorCode = this.errorCode.serialized();
            const errorMessage = this.errorMessage.serialized();
    
            return concat(constructor, errorCode, errorMessage);
        }
    
        constructor(
            readonly errorCode: TLInt,
            readonly errorMessage: TLString) {}
    }

    export class RpcAnswerUnknown implements TLObject {
        static readonly cons = new TLInt(0x5e2ad36e);
    
        static deserialized(data: ByteStream): RpcAnswerUnknown | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            return new RpcAnswerUnknown()
        }
    
        serialized(): Uint8Array {
            const constructor = RpcAnswerUnknown.cons.serialized();
    
            return concat(constructor, );
        }
    
        constructor() {}
    }

    export class RpcAnswerDroppedRunning implements TLObject {
        static readonly cons = new TLInt(0xcd78e586);
    
        static deserialized(data: ByteStream): RpcAnswerDroppedRunning | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            return new RpcAnswerDroppedRunning()
        }
    
        serialized(): Uint8Array {
            const constructor = RpcAnswerDroppedRunning.cons.serialized();
    
            return concat(constructor, );
        }
    
        constructor() {}
    }

    export class RpcAnswerDropped implements TLObject {
        static readonly cons = new TLInt(0xa43ad8b7);
    
        static deserialized(data: ByteStream): RpcAnswerDropped | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const msgId = TLLong.deserialized(data);
            if (!msgId) return undefined;
    
            const seqNo = TLInt.deserialized(data);
            if (!seqNo) return undefined;
    
            const bytes = TLInt.deserialized(data);
            if (!bytes) return undefined;
    
            return new RpcAnswerDropped(
                msgId,
                seqNo,
                bytes)
        }
    
        serialized(): Uint8Array {
            const constructor = RpcAnswerDropped.cons.serialized();
            const msgId = this.msgId.serialized();
            const seqNo = this.seqNo.serialized();
            const bytes = this.bytes.serialized();
    
            return concat(constructor, msgId, seqNo, bytes);
        }
    
        constructor(
            readonly msgId: TLLong,
            readonly seqNo: TLInt,
            readonly bytes: TLInt) {}
    }

    export class Pong implements TLObject {
        static readonly cons = new TLInt(0x347773c5);
    
        static deserialized(data: ByteStream): Pong | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const msgId = TLLong.deserialized(data);
            if (!msgId) return undefined;
    
            const pingId = TLLong.deserialized(data);
            if (!pingId) return undefined;
    
            return new Pong(
                msgId,
                pingId)
        }
    
        serialized(): Uint8Array {
            const constructor = Pong.cons.serialized();
            const msgId = this.msgId.serialized();
            const pingId = this.pingId.serialized();
    
            return concat(constructor, msgId, pingId);
        }
    
        constructor(
            readonly msgId: TLLong,
            readonly pingId: TLLong) {}
    }

    export class DestroySessionOk implements TLObject {
        static readonly cons = new TLInt(0xe22045fc);
    
        static deserialized(data: ByteStream): DestroySessionOk | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const sessionId = TLLong.deserialized(data);
            if (!sessionId) return undefined;
    
            return new DestroySessionOk(
                sessionId)
        }
    
        serialized(): Uint8Array {
            const constructor = DestroySessionOk.cons.serialized();
            const sessionId = this.sessionId.serialized();
    
            return concat(constructor, sessionId);
        }
    
        constructor(
            readonly sessionId: TLLong) {}
    }

    export class DestroySessionNone implements TLObject {
        static readonly cons = new TLInt(0x62d350c9);
    
        static deserialized(data: ByteStream): DestroySessionNone | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const sessionId = TLLong.deserialized(data);
            if (!sessionId) return undefined;
    
            return new DestroySessionNone(
                sessionId)
        }
    
        serialized(): Uint8Array {
            const constructor = DestroySessionNone.cons.serialized();
            const sessionId = this.sessionId.serialized();
    
            return concat(constructor, sessionId);
        }
    
        constructor(
            readonly sessionId: TLLong) {}
    }

    export class NewSessionCreated implements TLObject {
        static readonly cons = new TLInt(0x9ec20908);
    
        static deserialized(data: ByteStream): NewSessionCreated | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const firstMsgId = TLLong.deserialized(data);
            if (!firstMsgId) return undefined;
    
            const uniqueId = TLLong.deserialized(data);
            if (!uniqueId) return undefined;
    
            const serverSalt = TLLong.deserialized(data);
            if (!serverSalt) return undefined;
    
            return new NewSessionCreated(
                firstMsgId,
                uniqueId,
                serverSalt)
        }
    
        serialized(): Uint8Array {
            const constructor = NewSessionCreated.cons.serialized();
            const firstMsgId = this.firstMsgId.serialized();
            const uniqueId = this.uniqueId.serialized();
            const serverSalt = this.serverSalt.serialized();
    
            return concat(constructor, firstMsgId, uniqueId, serverSalt);
        }
    
        constructor(
            readonly firstMsgId: TLLong,
            readonly uniqueId: TLLong,
            readonly serverSalt: TLLong) {}
    }

    export class MsgContainer implements TLObject {
        static readonly cons = new TLInt(0x73f1f8dc);
    
        static deserialized(data: ByteStream): MsgContainer | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const messagesCount = TLInt.deserialized(data);
            if (!messagesCount) return undefined;
    
            let messages: Message[] = [];
            for (let i = 0; i < messagesCount.value; i++) {
                const tmp = Message.deserialized(data);
                if (!tmp) return undefined;
                messages.push(tmp);
            }
    
            return new MsgContainer(
                messages)
        }
    
        serialized(): Uint8Array {
            const constructor = MsgContainer.cons.serialized();
    
            const count = new TLInt(this.messages.length).serialized();
            const messages: Uint8Array[] = [];
    
            this.messages.forEach(item => {
                messages.push(item.serialized());
            });
    
            return concat(constructor, count, ...messages);
        }
    
        constructor(
            readonly messages: Message[]) {}
    }

    export class Message implements TLObject {
        static readonly cons = new TLInt(0x5bb8e511);
    
        static deserialized(data: ByteStream): Message | undefined {
    
            const msgId = TLLong.deserialized(data);
            if (!msgId) return undefined;
    
            const seqno = TLInt.deserialized(data);
            if (!seqno) return undefined;
    
            // ignore bytes arg
            const _ = TLInt.deserialized(data);
            if (!_) return undefined;
    
            const body = deserializedObject(data);
            if (!body) return undefined;
    
            return new Message(
                msgId,
                seqno,
                // ignore bytes arg
                body)
        }
    
        serialized(): Uint8Array {const msgId = this.msgId.serialized();
            const seqno = this.seqno.serialized();
            const body = this.body.serialized();
            const len = new TLInt(body.length).serialized();
    
            return concat(msgId, seqno, len, body);
        }
    
        constructor(
            readonly msgId: TLLong,
            readonly seqno: TLInt,
            // ignore bytes arg
            readonly body: TLObject) {}
    }

    export class MsgCopy implements TLObject {
        static readonly cons = new TLInt(0xe06046b2);
    
        static deserialized(data: ByteStream): MsgCopy | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const origMessage = Message.deserialized(data);
            if (!origMessage) return undefined;
    
            return new MsgCopy(
                origMessage)
        }
    
        serialized(): Uint8Array {
            const constructor = MsgCopy.cons.serialized();
            const origMessage = this.origMessage.serialized();
    
            return concat(constructor, origMessage);
        }
    
        constructor(
            readonly origMessage: Message) {}
    }

    export class GzipPacked implements TLObject {
        static readonly cons = new TLInt(0x3072cfa1);
    
        static deserialized(data: ByteStream): GzipPacked | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const packedData = TLBytes.deserialized(data);
            if (!packedData) return undefined;
    
            return new GzipPacked(
                packedData)
        }
    
        serialized(): Uint8Array {
            const constructor = GzipPacked.cons.serialized();
            const packedData = this.packedData.serialized();
    
            return concat(constructor, packedData);
        }
    
        constructor(
            readonly packedData: TLBytes) {}
    }

    export class MsgsAck implements TLObject {
        static readonly cons = new TLInt(0x62d6b459);
    
        static deserialized(data: ByteStream): MsgsAck | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const msgIds = TLVector.deserialized(data, TLLong) as TLVector<TLLong>;
            if (!msgIds) return undefined;
    
            return new MsgsAck(
                msgIds)
        }
    
        serialized(): Uint8Array {
            const constructor = MsgsAck.cons.serialized();
            const msgIds = this.msgIds.serialized();
    
            return concat(constructor, msgIds);
        }
    
        constructor(
            readonly msgIds: TLVector<TLLong>) {}
    }

    export class BadMsgNotification implements TLObject {
        static readonly cons = new TLInt(0xa7eff811);
    
        static deserialized(data: ByteStream): BadMsgNotification | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const badMsgId = TLLong.deserialized(data);
            if (!badMsgId) return undefined;
    
            const badMsgSeqno = TLInt.deserialized(data);
            if (!badMsgSeqno) return undefined;
    
            const errorCode = TLInt.deserialized(data);
            if (!errorCode) return undefined;
    
            return new BadMsgNotification(
                badMsgId,
                badMsgSeqno,
                errorCode)
        }
    
        serialized(): Uint8Array {
            const constructor = BadMsgNotification.cons.serialized();
            const badMsgId = this.badMsgId.serialized();
            const badMsgSeqno = this.badMsgSeqno.serialized();
            const errorCode = this.errorCode.serialized();
    
            return concat(constructor, badMsgId, badMsgSeqno, errorCode);
        }
    
        constructor(
            readonly badMsgId: TLLong,
            readonly badMsgSeqno: TLInt,
            readonly errorCode: TLInt) {}
    }

    export class BadServerSalt implements TLObject {
        static readonly cons = new TLInt(0xedab447b);
    
        static deserialized(data: ByteStream): BadServerSalt | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const badMsgId = TLLong.deserialized(data);
            if (!badMsgId) return undefined;
    
            const badMsgSeqno = TLInt.deserialized(data);
            if (!badMsgSeqno) return undefined;
    
            const errorCode = TLInt.deserialized(data);
            if (!errorCode) return undefined;
    
            const newServerSalt = TLLong.deserialized(data);
            if (!newServerSalt) return undefined;
    
            return new BadServerSalt(
                badMsgId,
                badMsgSeqno,
                errorCode,
                newServerSalt)
        }
    
        serialized(): Uint8Array {
            const constructor = BadServerSalt.cons.serialized();
            const badMsgId = this.badMsgId.serialized();
            const badMsgSeqno = this.badMsgSeqno.serialized();
            const errorCode = this.errorCode.serialized();
            const newServerSalt = this.newServerSalt.serialized();
    
            return concat(constructor, badMsgId, badMsgSeqno, errorCode, newServerSalt);
        }
    
        constructor(
            readonly badMsgId: TLLong,
            readonly badMsgSeqno: TLInt,
            readonly errorCode: TLInt,
            readonly newServerSalt: TLLong) {}
    }

    export class MsgResendReq implements TLObject {
        static readonly cons = new TLInt(0x7d861a08);
    
        static deserialized(data: ByteStream): MsgResendReq | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const msgIds = TLVector.deserialized(data, TLLong) as TLVector<TLLong>;
            if (!msgIds) return undefined;
    
            return new MsgResendReq(
                msgIds)
        }
    
        serialized(): Uint8Array {
            const constructor = MsgResendReq.cons.serialized();
            const msgIds = this.msgIds.serialized();
    
            return concat(constructor, msgIds);
        }
    
        constructor(
            readonly msgIds: TLVector<TLLong>) {}
    }

    export class MsgsStateReq implements TLObject {
        static readonly cons = new TLInt(0xda69fb52);
    
        static deserialized(data: ByteStream): MsgsStateReq | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const msgIds = TLVector.deserialized(data, TLLong) as TLVector<TLLong>;
            if (!msgIds) return undefined;
    
            return new MsgsStateReq(
                msgIds)
        }
    
        serialized(): Uint8Array {
            const constructor = MsgsStateReq.cons.serialized();
            const msgIds = this.msgIds.serialized();
    
            return concat(constructor, msgIds);
        }
    
        constructor(
            readonly msgIds: TLVector<TLLong>) {}
    }

    export class MsgsStateInfo implements TLObject {
        static readonly cons = new TLInt(0x04deb57d);
    
        static deserialized(data: ByteStream): MsgsStateInfo | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const reqMsgId = TLLong.deserialized(data);
            if (!reqMsgId) return undefined;
    
            const info = TLBytes.deserialized(data);
            if (!info) return undefined;
    
            return new MsgsStateInfo(
                reqMsgId,
                info)
        }
    
        serialized(): Uint8Array {
            const constructor = MsgsStateInfo.cons.serialized();
            const reqMsgId = this.reqMsgId.serialized();
            const info = this.info.serialized();
    
            return concat(constructor, reqMsgId, info);
        }
    
        constructor(
            readonly reqMsgId: TLLong,
            readonly info: TLBytes) {}
    }

    export class MsgsAllInfo implements TLObject {
        static readonly cons = new TLInt(0x8cc0d131);
    
        static deserialized(data: ByteStream): MsgsAllInfo | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const msgIds = TLVector.deserialized(data, TLLong) as TLVector<TLLong>;
            if (!msgIds) return undefined;
    
            const info = TLBytes.deserialized(data);
            if (!info) return undefined;
    
            return new MsgsAllInfo(
                msgIds,
                info)
        }
    
        serialized(): Uint8Array {
            const constructor = MsgsAllInfo.cons.serialized();
            const msgIds = this.msgIds.serialized();
            const info = this.info.serialized();
    
            return concat(constructor, msgIds, info);
        }
    
        constructor(
            readonly msgIds: TLVector<TLLong>,
            readonly info: TLBytes) {}
    }

    export class MsgDetailedInfo implements TLObject {
        static readonly cons = new TLInt(0x276d3ec6);
    
        static deserialized(data: ByteStream): MsgDetailedInfo | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const msgId = TLLong.deserialized(data);
            if (!msgId) return undefined;
    
            const answerMsgId = TLLong.deserialized(data);
            if (!answerMsgId) return undefined;
    
            const bytes = TLInt.deserialized(data);
            if (!bytes) return undefined;
    
            const status = TLInt.deserialized(data);
            if (!status) return undefined;
    
            return new MsgDetailedInfo(
                msgId,
                answerMsgId,
                bytes,
                status)
        }
    
        serialized(): Uint8Array {
            const constructor = MsgDetailedInfo.cons.serialized();
            const msgId = this.msgId.serialized();
            const answerMsgId = this.answerMsgId.serialized();
            const bytes = this.bytes.serialized();
            const status = this.status.serialized();
    
            return concat(constructor, msgId, answerMsgId, bytes, status);
        }
    
        constructor(
            readonly msgId: TLLong,
            readonly answerMsgId: TLLong,
            readonly bytes: TLInt,
            readonly status: TLInt) {}
    }

    export class MsgNewDetailedInfo implements TLObject {
        static readonly cons = new TLInt(0x809db6df);
    
        static deserialized(data: ByteStream): MsgNewDetailedInfo | undefined {
            const constructor = TLInt.deserialized(data);
            if (!constructor) return undefined;
    
            const answerMsgId = TLLong.deserialized(data);
            if (!answerMsgId) return undefined;
    
            const bytes = TLInt.deserialized(data);
            if (!bytes) return undefined;
    
            const status = TLInt.deserialized(data);
            if (!status) return undefined;
    
            return new MsgNewDetailedInfo(
                answerMsgId,
                bytes,
                status)
        }
    
        serialized(): Uint8Array {
            const constructor = MsgNewDetailedInfo.cons.serialized();
            const answerMsgId = this.answerMsgId.serialized();
            const bytes = this.bytes.serialized();
            const status = this.status.serialized();
    
            return concat(constructor, answerMsgId, bytes, status);
        }
    
        constructor(
            readonly answerMsgId: TLLong,
            readonly bytes: TLInt,
            readonly status: TLInt) {}
    }

    export class ReqPq implements TLFunction<ResPQ> {
        static readonly cons = new TLInt(0x60469778);
    
        serialized(): Uint8Array {
            const constructor = ReqPq.cons.serialized();
            const nonce = this.nonce.serialized();
    
            return concat(constructor, nonce);
        }
    
        constructor(
            readonly nonce: TLInt128) {}
    }

    export class ReqDHParams implements TLFunction<ServerDHParamsType> {
        static readonly cons = new TLInt(0xd712e4be);
    
        serialized(): Uint8Array {
            const constructor = ReqDHParams.cons.serialized();
            const nonce = this.nonce.serialized();
            const serverNonce = this.serverNonce.serialized();
            const p = this.p.serialized();
            const q = this.q.serialized();
            const publicKeyFingerprint = this.publicKeyFingerprint.serialized();
            const encryptedData = this.encryptedData.serialized();
    
            return concat(constructor, nonce, serverNonce, p, q, publicKeyFingerprint, encryptedData);
        }
    
        constructor(
            readonly nonce: TLInt128,
            readonly serverNonce: TLInt128,
            readonly p: TLBytes,
            readonly q: TLBytes,
            readonly publicKeyFingerprint: TLLong,
            readonly encryptedData: TLBytes) {}
    }

    export class SetClientDHParams implements TLFunction<SetClientDHParamsAnswerType> {
        static readonly cons = new TLInt(0xf5045f1f);
    
        serialized(): Uint8Array {
            const constructor = SetClientDHParams.cons.serialized();
            const nonce = this.nonce.serialized();
            const serverNonce = this.serverNonce.serialized();
            const encryptedData = this.encryptedData.serialized();
    
            return concat(constructor, nonce, serverNonce, encryptedData);
        }
    
        constructor(
            readonly nonce: TLInt128,
            readonly serverNonce: TLInt128,
            readonly encryptedData: TLBytes) {}
    }

    export class RpcDropAnswer implements TLFunction<RpcDropAnswerType> {
        static readonly cons = new TLInt(0x58e4a740);
    
        serialized(): Uint8Array {
            const constructor = RpcDropAnswer.cons.serialized();
            const reqMsgId = this.reqMsgId.serialized();
    
            return concat(constructor, reqMsgId);
        }
    
        constructor(
            readonly reqMsgId: TLLong) {}
    }

    export class Ping implements TLFunction<Pong> {
        static readonly cons = new TLInt(0x7abe77ec);
    
        serialized(): Uint8Array {
            const constructor = Ping.cons.serialized();
            const pingId = this.pingId.serialized();
    
            return concat(constructor, pingId);
        }
    
        constructor(
            readonly pingId: TLLong) {}
    }

    export class PingDelayDisconnect implements TLFunction<Pong> {
        static readonly cons = new TLInt(0xf3427b8c);
    
        serialized(): Uint8Array {
            const constructor = PingDelayDisconnect.cons.serialized();
            const pingId = this.pingId.serialized();
            const disconnectDelay = this.disconnectDelay.serialized();
    
            return concat(constructor, pingId, disconnectDelay);
        }
    
        constructor(
            readonly pingId: TLLong,
            readonly disconnectDelay: TLInt) {}
    }

    export class DestroySession implements TLFunction<DestroySessionResType> {
        static readonly cons = new TLInt(0xe7512126);
    
        serialized(): Uint8Array {
            const constructor = DestroySession.cons.serialized();
            const sessionId = this.sessionId.serialized();
    
            return concat(constructor, sessionId);
        }
    
        constructor(
            readonly sessionId: TLLong) {}
    }

    export class HttpWait implements TLFunction<HttpWait> {
        static readonly cons = new TLInt(0x9299359f);
    
        serialized(): Uint8Array {
            const constructor = HttpWait.cons.serialized();
            const maxDelay = this.maxDelay.serialized();
            const waitAfter = this.waitAfter.serialized();
            const maxWait = this.maxWait.serialized();
    
            return concat(constructor, maxDelay, waitAfter, maxWait);
        }
    
        constructor(
            readonly maxDelay: TLInt,
            readonly waitAfter: TLInt,
            readonly maxWait: TLInt) {}
    }

    export const constructables = ((): HashMap<TLInt, any> => {
        const map = new HashMap<TLInt, any>();
    
        map.put(ResPQ.cons, ResPQ);
        map.put(PQInnerData.cons, PQInnerData);
        map.put(PQInnerDataTemp.cons, PQInnerDataTemp);
        map.put(ServerDHParamsFail.cons, ServerDHParamsFail);
        map.put(ServerDHParamsOk.cons, ServerDHParamsOk);
        map.put(ServerDHInnerData.cons, ServerDHInnerData);
        map.put(ClientDHInnerData.cons, ClientDHInnerData);
        map.put(DhGenOk.cons, DhGenOk);
        map.put(DhGenRetry.cons, DhGenRetry);
        map.put(DhGenFail.cons, DhGenFail);
        map.put(RpcResult.cons, RpcResult);
        map.put(RpcError.cons, RpcError);
        map.put(RpcAnswerUnknown.cons, RpcAnswerUnknown);
        map.put(RpcAnswerDroppedRunning.cons, RpcAnswerDroppedRunning);
        map.put(RpcAnswerDropped.cons, RpcAnswerDropped);
        map.put(Pong.cons, Pong);
        map.put(DestroySessionOk.cons, DestroySessionOk);
        map.put(DestroySessionNone.cons, DestroySessionNone);
        map.put(NewSessionCreated.cons, NewSessionCreated);
        map.put(MsgContainer.cons, MsgContainer);
        map.put(Message.cons, Message);
        map.put(MsgCopy.cons, MsgCopy);
        map.put(GzipPacked.cons, GzipPacked);
        map.put(MsgsAck.cons, MsgsAck);
        map.put(BadMsgNotification.cons, BadMsgNotification);
        map.put(BadServerSalt.cons, BadServerSalt);
        map.put(MsgResendReq.cons, MsgResendReq);
        map.put(MsgsStateReq.cons, MsgsStateReq);
        map.put(MsgsStateInfo.cons, MsgsStateInfo);
        map.put(MsgsAllInfo.cons, MsgsAllInfo);
        map.put(MsgDetailedInfo.cons, MsgDetailedInfo);
        map.put(MsgNewDetailedInfo.cons, MsgNewDetailedInfo);
    
        return map;
    })();
} // namespace MTProto
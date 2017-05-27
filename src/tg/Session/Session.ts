import {TLLong} from "../TL/Types/TLLong";
import * as Long from "long";
import {MonotonicClock} from "../MonotonicClock/MonotonicClock";
import {TLObject} from "../TL/Interfaces/TLObject";
import {HashMap} from "../DataStructures/HashMap/HashMap";
import {TLEncryptedMessage} from "../TL/TLEncryptedMessage";
import {Queue} from "../DataStructures/Queue";
import {EvictingQueue} from "../DataStructures/EvictingQueue";
import {MTProto} from "../Codegen/MTProto/MTProtoSchema";
import {TLMessage} from "../TL/TLMessage";
import {ByteStream} from "../DataStructures/ByteStream";
import {SecureRandom} from "../SecureRandom/SecureRandom";
import {Observable} from "rxjs/Observable";
import {sha1} from "../SHA/SHA";
import {TLInt} from "../TL/Types/TLInt";
import {AuthKeyGenerator} from "./AuthKeyGenerator";
import {concat} from "../Utils/BytesConcat";
import {API} from "../Codegen/API/APISchema";
import {TLBytes} from "../TL/Types/TLBytes";
import {BN} from "bn.js";
import {Gzip} from "../Gzip/Gzip";
import {deserializedObject} from "../TL/TLObjectDeserializer";
import {TLVector} from "../TL/Types/TLVector";

export class Session {
    private readonly sessionId = SecureRandom.bytes(8);
    private readonly clock = new MonotonicClock();

    private readonly requests = new Queue<Request>();
    private readonly acknowledgments = new Queue<TLLong>();
    private readonly onResults
        = new HashMap<TLLong, {deserializedPrototype: Function, closure: (_: TLObject) => void}>();
    private readonly messagesAwaitingResponse
        = new HashMap<TLLong, TLEncryptedMessage>();
    private readonly messagesStateRequests = new HashMap<TLLong, TLLong>();
    private readonly lastServerMessageIds = new EvictingQueue<TLLong>(32);

    private messageSequenceNumber = 0;

    authKey?: Uint8Array;
    serverSalt?: Uint8Array;
    timeDifference?: number;

    constructor(private readonly host: string) {

    }

    send(content: TLObject,
         onResult?: (result: TLObject) => void,
         deserializedPrototype?: Function) {
        const reqMsgId = this.newMessageId();
        this.requests.enqueue({
            reqMsgId: reqMsgId,
            content: content,
            onResult: onResult,
            deserializedPrototype: deserializedPrototype
        });
        this.dispatchOutput();
    }

    close() {

    }

    bindTo(key: Uint8Array): Observable<boolean> {
        return new Observable<boolean>(observer => {
            const reqMsgId = this.newMessageId();
            const bindKey = bindTempAuthKey(
                reqMsgId,
                this.sessionId,
                this.authKey!,
                key,
                this.serverTime().idivn(1000).toNumber());
            const closure = (result: TLObject) => {
                if (result instanceof API.BoolTrue) {
                    observer.next();
                } else {
                    observer.error();
                }
            };
            this.requests.enqueue({
                reqMsgId: reqMsgId,
                content: bindKey,
                onResult: closure,
            });
            this.dispatchOutput();
        });
    }

    private dispatchOutput() {
        const request = this.requests.dequeue();
        if (!request) return;

        const message = this.messageForContent(
            request.reqMsgId, request.content);
        if (request.onResult) {
            this.onResults.put(request.reqMsgId, {
                deserializedPrototype: request.deserializedPrototype,
                closure: request.onResult
            });
            if (message instanceof TLEncryptedMessage) {
                this.messagesAwaitingResponse.put(request.reqMsgId, message);
            }
        }
        const reqInit = {
            method: "POST",
            body: message.serialized(),
            // Some weird bug in the compiler needs a cast to any
            cache: "no-store" as any,
            keepalive: true,
        };
        fetch(`http://${ this.host }/apiw1`, reqInit)
            .then(response => {
                return response.arrayBuffer();
            })
            .then(buffer => {
                this.dispatchInput(new Uint8Array(buffer));
            })
            .catch(() => {
                this.close();
            });
    }

    private dispatchInput(bytes: Uint8Array) {
        const byteStream = new ByteStream(bytes);
        if (this.authKey && this.serverSalt) {
            const message = TLEncryptedMessage.deserialized(
                byteStream,
                this.authKey,
                this.serverSalt,
                this.sessionId);
            if (message) {
                this.processIncomingEncryptedMessage(message);
            }
        } else {
            const message = TLMessage.deserialized(byteStream);
            if (!message) return;

            const reqMsgId = this.onResults
                .keys
                .sort((a, b) => a.value.compare(b.value))[0];
            if (!reqMsgId) return;

            const onResult = this.onResults.remove(reqMsgId);
            if (!onResult) return;

            onResult.closure(message.content);
        }
    }

    private processIncomingEncryptedMessage(message: TLEncryptedMessage) {
        const content = message.content;
        if (content instanceof MTProto.MsgContainer) {
            if (!this.isValidServerMessageId(message.messageId)) {
                for (let msg of content.messages) {
                    if (msg.body instanceof MTProto.RpcResult) {
                        this.onResults.remove(msg.body.reqMsgId);
                        this.messagesAwaitingResponse.remove(msg.body.reqMsgId);
                    }
                }
                return;
            }
            for (let msg of content.messages) {
                if (msg.body instanceof MTProto.RpcResult) {
                    this.lastServerMessageIds.enqueue(msg.msgId);
                    this.acknowledgments.enqueue(msg.msgId);
                    this.processRPCResult(msg.body);
                } else {
                    this.processServiceMessage(msg.body, msg.msgId);
                }
            }
        } else if (content instanceof MTProto.RpcResult) {
            if (this.messagesAwaitingResponse.keys.find(
                    key => key.equals(content.reqMsgId)) ||
                this.isValidServerMessageId(message.messageId)) {
                this.lastServerMessageIds.enqueue(message.messageId);
                this.acknowledgments.enqueue(message.messageId);
                this.processRPCResult(content);
            } else {
                this.onResults.remove(content.reqMsgId);
                this.messagesAwaitingResponse.remove(content.reqMsgId);
            }
            // The server may answer to the state request by directly resending
            // the response.
            // In that case we have to remove it from the map.
            const stateReqMsgId = this.messagesStateRequests.entries
                .find(entry => entry.value.equals(content.reqMsgId));
            if (stateReqMsgId) {
                this.messagesStateRequests.remove(stateReqMsgId.key);
            }
        } else {
            this.processServiceMessage(message.content, message.messageId);
        }
    }

    private processRPCResult(rpc: MTProto.RpcResult) {
        const defer = () => {
            this.onResults.remove(rpc.reqMsgId);
            this.messagesAwaitingResponse.remove(rpc.reqMsgId);
        };
        const onResult = this.onResults.get(rpc.reqMsgId);
        if (!onResult) {
            defer();
            return;
        }
        const packed = MTProto.GzipPacked.deserialized(rpc.result);
        let result: TLObject | undefined;
        if (packed) {
            const bytes = Gzip.decompress(packed.packedData.bytes);
            if (!bytes) {
                defer();
                return;
            }
            result = this.deserializedResult(
                new ByteStream(bytes), onResult.deserializedPrototype);
        } else {
            // Rewind 4 bytes when the deserialization as gzip fails since
            // the cursor was moved forth to check the constructor.
            rpc.result.moveCursorBy(-4);
            result = this.deserializedResult(
                rpc.result, onResult.deserializedPrototype);
        }

        if (result) {
            onResult.closure(result);
        }

        defer();
    }

    private deserializedResult(
        data: ByteStream,
        deserializedPrototype?: Function): TLObject | undefined {
        if (deserializedPrototype) {
            return deserializedPrototype(data);
        } else {
            return deserializedObject(data);
        }
    }

    private processServiceMessage(message: TLObject, messageId: TLLong) {
        switch (message.constructor) {
            case MTProto.NewSessionCreated:
                this.send(new MTProto.MsgsAck(new TLVector<TLLong>(messageId)));
                break;
        }
    }

    private messageForContent(
        reqMsgId: TLLong,
        content: TLObject): TLEncryptedMessage | TLMessage {
        if (this.authKey && this.serverSalt) {
            let isContentRelated: boolean;
            switch (content.constructor) {
                case MTProto.MsgContainer:
                    isContentRelated = false;
                    break;
                case MTProto.MsgsAck:
                    isContentRelated = false;
                    break;
                default:
                    isContentRelated = true;
                    break;
            }
            return new TLEncryptedMessage(
                this.authKey,
                this.serverSalt,
                this.sessionId,
                reqMsgId,
                this.newSequenceNumber(isContentRelated),
                content);
        } else {
            return new TLMessage(reqMsgId, content);
        }
    }

     newMessageId(): TLLong {
        const now = this.serverTime();
        return Session.messageIdForTimestamp(now);
    }

    private newSequenceNumber(contentRelated: boolean): TLInt {
        let seqNo = this.messageSequenceNumber * 2;
        if (contentRelated) {
            seqNo += 1;
            this.messageSequenceNumber += 1;
        }

        return new TLInt(seqNo);
    }

    private isValidServerMessageId(messageId: TLLong): boolean {
        // Message ids from the server have to be odd
        if (messageId.value.isEven()) {
            return false;
        }
        for (let msgId of this.lastServerMessageIds.entries) {
            if (messageId.value.lte(msgId.value)) {
                return false;
            }
        }
        if (!this.timeDifference) {
            // We can't be certain since
            // the time hasn't been synchronized with the server
            return true;
        }

        const timestamp = Session.timestampForMessageId(messageId);
        const diff = this.serverTime().isub(timestamp);

        // Message ids that belong over 30 seconds in the future or
        // over 300 in the past are not valid
        return diff.lten(30 * 1000) && diff.gten(-300 * 1000);
    }

    serverTime(): BN {
        if (this.timeDifference) {
            return this.clock.timestamp.subn(this.timeDifference);
        }
        return this.clock.timestamp;
    }

    static messageIdForTimestamp(timestamp: BN): TLLong {
        // Timestamp * 2^32 as per the MTProto spec
        let now = timestamp.iushln(30).idivn(1000).imuln(4).toString();
        return new TLLong(Long.fromString(now, true));
    }

    static timestampForMessageId(messageId: TLLong): BN {
        return new BN(messageId.value.toString())
            .idivn(4).imuln(1000).iushrn(30);
    }
}

interface Request {
    reqMsgId: TLLong,
    content: TLObject,
    onResult?: (_: TLObject) => void,
    deserializedPrototype?: any,
}

const bindTempAuthKey = (messageId: TLLong,
                         sessionId: Uint8Array,
                         tempAuthKey: Uint8Array,
                         permAuthKey: Uint8Array,
                         serverTime: number): API.auth.BindTempAuthKey => {
    const nonce = SecureRandom.bytes(8);
    const tempAuthKeyId = sha1(tempAuthKey).slice(12,);
    const permAuthKeyId = sha1(permAuthKey).slice(12,);
    const expiresAt = new TLInt(
        serverTime + AuthKeyGenerator.temporaryKeyExpiresIn);

    const encryptedMessage = new TLEncryptedMessage(
        permAuthKey,
        SecureRandom.bytes(8),
        SecureRandom.bytes(8),
        messageId,
        new TLInt(0),
        new BindAuthKeyInner(
            nonce, tempAuthKeyId, permAuthKeyId, sessionId, expiresAt));

    return new API.auth.BindTempAuthKey(
        TLLong.deserialized(new ByteStream(permAuthKeyId))!,
        TLLong.deserialized(new ByteStream(nonce))!,
        expiresAt,
        new TLBytes(encryptedMessage.serialized()));
};

class BindAuthKeyInner implements TLObject {
    static readonly cons = new TLInt(0x75a3f765);

    serialized(): Uint8Array {
        return concat(
            BindAuthKeyInner.cons.serialized(),
            this.nonce,
            this.tempAuthKeyId,
            this.permAuthKeyId,
            this.tempSessionId,
            this.expiresAt.serialized(),
        );
    }

    constructor(readonly nonce: Uint8Array,
                readonly tempAuthKeyId: Uint8Array,
                readonly permAuthKeyId: Uint8Array,
                readonly tempSessionId: Uint8Array,
                readonly expiresAt: TLInt) {}
}
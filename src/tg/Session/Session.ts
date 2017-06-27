import { BN } from "bn.js";
import * as Long from "long";
import { Observable } from "rxjs/Observable";
import { API } from "../Codegen/API/APISchema";
import { MTProto } from "../Codegen/MTProto/MTProtoSchema";
import { ByteStream } from "../DataStructures/ByteStream";
import { EvictingQueue } from "../DataStructures/EvictingQueue";
import { HashMap } from "../DataStructures/HashMap/HashMap";
import { Queue } from "../DataStructures/Queue";
import { Gzip } from "../Gzip/Gzip";
import { MonotonicClock } from "../MonotonicClock/MonotonicClock";
import { SecureRandom } from "../SecureRandom/SecureRandom";
import { sha1 } from "../SHA/SHA";
import { TLObject } from "../TL/Interfaces/TLObject";
import { TLEncryptedMessage } from "../TL/TLEncryptedMessage";
import { TLMessage } from "../TL/TLMessage";
import { deserializedObject } from "../TL/TLObjectDeserializer";
import { TLBytes } from "../TL/Types/TLBytes";
import { TLInt } from "../TL/Types/TLInt";
import { TLLong } from "../TL/Types/TLLong";
import { TLVector } from "../TL/Types/TLVector";
import { concat } from "../Utils/BytesConcat";
import { AuthKeyGenerator } from "./AuthKeyGenerator";

export class Session {
    private readonly sessionId = SecureRandom.bytes(8);
    private readonly clock = new MonotonicClock();

    private readonly pendingRequests = new HashMap<TLLong, XMLHttpRequest>();
    private readonly requests = new Queue<Request>();
    private readonly acknowledgments = new Queue<TLLong>();
    private readonly onResults
        = new HashMap<TLLong, (_: TLObject | Uint8Array) => void>();
    private readonly messagesAwaitingResponse
        = new HashMap<TLLong, TLEncryptedMessage>();
    private readonly messagesStateRequests = new HashMap<TLLong, TLLong>();
    private readonly lastServerMessageIds = new EvictingQueue<TLLong>(128);
    private readonly monitoringIntervalId: number;

    private messageSequenceNumber = 0;
    private lastMessageProcessedAt = this.serverTime();
    closed = false;

    delegate?: SessionDelegate;

    authKey?: Uint8Array;
    serverSalt?: Uint8Array;
    timeDifference?: number;

    constructor(private readonly host: string) {
        this.monitoringIntervalId = setInterval(() => this.monitor(), 5000);

        console.debug(
            `[${this.host}]`,
            "Created session",
            Array.from(this.sessionId)
                .map(x => x.toString(16).slice(-2))
                .join(""));
    }

    /**
     * Send an object to server with an optional handler that will be executed
     * once the result is received.
     * @param content
     * @param onResult
     */
    send(content: TLObject,
         onResult?: (result: TLObject | Uint8Array) => void) {
        const reqMsgId = this.newMessageId();
        this.requests.enqueue({
            reqMsgId: reqMsgId,
            content: content,
            onResult: onResult,
        });
        this.dispatchOutput();
    }

    close() {
        if (this.closed) {
            return;
        } else {
            this.closed = true;
        }

        console.debug(
            `[${this.host}]`,
            "Closing session",
            Array.from(this.sessionId)
                .map(x => x.toString(16).slice(-2))
                .join(""));

        this.pendingRequests.forEach((_, value) => {
            value.abort();
        });

        clearInterval(this.monitoringIntervalId);

        const legacy: SessionLegacy = {
            requests: this.requests,
            acknowledgments: this.acknowledgments,
            onResults: this.onResults,
            messagesAwaitingResponse: this.messagesAwaitingResponse,
        };
        if (this.delegate) {
            this.delegate.sessionClosed(legacy);
        }
    }

    /**
     * Accept legacy of the previous session.
     * @param legacy
     */
    acceptLegacy(legacy: SessionLegacy) {
        const requests = legacy.requests.entries.filter(request => {
            // Drop requests that will be executed in the new session
            // anyway to avoid making them twice.
            return !(request.content instanceof MTProto.HttpWait)
                && !(request.content instanceof API.updates.GetState)
                && !(request.content instanceof API.updates.GetDifference);
        });
        for (let request of requests) {
            this.send(
                request.content,
                request.onResult);
        }
        for (let ack of legacy.acknowledgments.entries) {
            this.acknowledgments.enqueue(ack);
        }
        legacy.onResults.forEach((key, value) => {
            this.onResults.put(key, value);
        });
        legacy.messagesAwaitingResponse.forEach((key, value) => {
            this.messagesAwaitingResponse.put(key, value);
        });
    }

    bindTo(key: Uint8Array): Observable<boolean> {
        return new Observable<boolean>(observer => {
            const reqMsgId = this.newMessageId();
            const bindKey = bindTempAuthKey(
                reqMsgId,
                this.sessionId,
                this.authKey!,
                key,
                this.serverTime() / 1000);
            const closure = (result: TLObject) => {
                if (result instanceof API.BoolTrue) {
                    observer.next();
                } else {
                    observer.error();
                }
                observer.complete();
            };
            this.requests.enqueue({
                reqMsgId: reqMsgId,
                content: bindKey,
                onResult: closure,
            });
            this.dispatchOutput();
        });
    }

    private monitor() {
        if (this.lastMessageProcessedAt + 32000 < this.serverTime()) {
            this.close();
            return;
        }

        const lostResponses = this.onResults.keys.filter(msgId => {
            // No response in >10 seconds?
            return this.serverTime() - Session.timestampForMessageId(msgId) > 10000
                && !this.requests.entries.find(({reqMsgId}) => reqMsgId.equals(msgId))
                && !this.messagesStateRequests.keys.find(reqMsgId => reqMsgId.equals(msgId));
        });

        for (let reqMsgId of lostResponses) {
            if (this.authKey) {
                const message = this.messagesAwaitingResponse.get(reqMsgId);
                if (!message) continue;

                const req = new MTProto.MsgsStateReq(
                    new TLVector<TLLong>(message.messageId));
                const newReqMsgId = this.newMessageId();
                this.requests.enqueue({
                    reqMsgId: newReqMsgId,
                    content: req,
                });
                this.messagesStateRequests.put(newReqMsgId, reqMsgId);
                this.dispatchOutput();
            } else {
                this.close();
                break;
            }
        }

        // Acknowledge received messages
        if (this.acknowledgments.length > 0) {
            const ids: TLLong[] = [];
            while (this.acknowledgments.length > 0) {
                ids.push(this.acknowledgments.dequeue()!);
            }
            this.send(new MTProto.MsgsAck(new TLVector(...ids)));
        }
    }

    private dispatchOutput() {
        if (this.closed) {
            return;
        }

        const request = this.requests.dequeue();
        if (!request) return;

        const message = this.messageForContent(
            request.reqMsgId, request.content);
        if (request.onResult) {
            this.onResults.put(request.reqMsgId, request.onResult);
            if (message instanceof TLEncryptedMessage) {
                this.messagesAwaitingResponse.put(request.reqMsgId, message);
            }
        }

        const xhr = new XMLHttpRequest();
        this.pendingRequests.put(request.reqMsgId, xhr);
        xhr.onload = () => {
            const buffer: ArrayBuffer = xhr.response;
            this.dispatchInput(new Uint8Array(buffer));
        };
        xhr.onerror = () => {
            this.close();
        };
        xhr.onabort = () => {
            this.close();
        };
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                this.pendingRequests.remove(request.reqMsgId);
            }
        };

        xhr.responseType = "arraybuffer";
        xhr.open("POST", `http://${ this.host }/apiw1`, true);
        xhr.send(message.serialized().buffer);

        console.debug(
            `[${this.host}]`,
            "<<<",
            request.reqMsgId.value.toString(),
            request.content);
    }

    private dispatchInput(bytes: Uint8Array) {
        if (this.closed) {
            return;
        }

        const byteStream = new ByteStream(bytes);
        if (this.authKey && this.serverSalt) {
            const message = TLEncryptedMessage.deserialized(
                byteStream,
                this.authKey,
                this.serverSalt,
                this.sessionId);
            if (message) {
                console.debug(
                    `[${this.host}]`,
                    ">>>",
                    message.messageId.value.toString(),
                    message.content);
                this.processIncomingEncryptedMessage(message);
            }
            if (this.pendingRequests.size === 0) {
                this.send(new MTProto.HttpWait(
                    new TLInt(500), new TLInt(150), new TLInt(25000)));
            }
        } else {
            const message = TLMessage.deserialized(byteStream);
            if (!message) return;

            console.debug(
                `[${this.host}]`,
                ">>>",
                message.messageId.value.toString(),
                message.content);

            const reqMsgId = this.onResults
                .keys
                .sort((a, b) => a.value.compare(b.value))[0];
            if (!reqMsgId) return;

            const onResult = this.onResults.remove(reqMsgId);
            if (!onResult) return;

            onResult(message.content);
        }
    }

    private processIncomingEncryptedMessage(message: TLEncryptedMessage) {
        const content = message.content;
        if (content instanceof MTProto.MsgContainer) {
            for (let msg of content.messages) {
                this.processIncomingEncryptedMessageContent(
                    msg.msgId, msg.body);
            }
        } else {
            this.processIncomingEncryptedMessageContent(
                message.messageId, content);
        }
        this.lastMessageProcessedAt = this.serverTime();
    }

    private processIncomingEncryptedMessageContent(msgId: TLLong,
                                                   content: TLObject) {
        if (content instanceof MTProto.RpcResult) {
            if (this.messagesAwaitingResponse.keys
                    .find(key => key.equals(content.reqMsgId)) ||
                this.isValidServerMessageId(msgId)) {

                this.lastServerMessageIds.enqueue(msgId);
                this.acknowledgments.enqueue(msgId);
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
            this.processServiceMessage(msgId, content);
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
        let result: TLObject | Uint8Array;
        if (packed) {
            const bytes = Gzip.decompress(packed.packedData.bytes);
            if (!bytes) {
                defer();
                return;
            }
            result = deserializedObject(new ByteStream(bytes)) || bytes;
        } else {
            // Rewind 4 bytes when the deserialization as gzip fails since
            // the cursor was moved forth to check the constructor.
            rpc.result.moveCursorBy(-4);
            const cursorBefore = rpc.result.cursor;
            result = deserializedObject(rpc.result)
                || rpc.result.bytes.slice(cursorBefore);
        }

        onResult(result);

        defer();
    }

    private processServiceMessage(messageId: TLLong, message: TLObject) {
        switch (message.constructor) {
            case MTProto.NewSessionCreated: {
                this.acknowledgments.enqueue(messageId);
                if (this.delegate) {
                    this.delegate.newServerSessionCreated();
                }
            } break;

            case MTProto.BadMsgNotification: {
                const badMsgNotification = message as MTProto.BadMsgNotification;
                const entry = this.messagesAwaitingResponse.entries
                    .find(entry => {
                        return entry.value.messageId.equals(
                            badMsgNotification.badMsgId);
                    });
                if (!entry) {
                    this.close();
                    break;
                }

                const onResult = this.onResults.get(entry.key);
                if (!onResult) {
                    this.close();
                    break;
                }

                this.timeDifference = Date.now()
                    - Session.timestampForMessageId(messageId);
                this.send(entry.value.content, onResult);
                this.onResults.remove(entry.key);
                this.messagesAwaitingResponse.remove(entry.key);
            } break;

            case MTProto.BadServerSalt: {
                const badServerSalt = message as MTProto.BadServerSalt;
                const entry = this.messagesAwaitingResponse.entries
                    .find(entry => {
                        return entry.value.messageId.equals(
                            badServerSalt.badMsgId);
                    });
                if (!entry) {
                    this.close();
                    break;
                }

                const onResult = this.onResults.get(entry.key);
                if (!onResult) {
                    this.close();
                    break;
                }

                this.serverSalt = badServerSalt.newServerSalt.serialized();
                this.send(entry.value, onResult);
                this.onResults.remove(entry.key);
                this.messagesAwaitingResponse.remove(entry.key);
            } break;

            case MTProto.MsgsStateInfo: {
                const reqMsgId = (message as MTProto.MsgsStateInfo).reqMsgId;
                const info = (message as MTProto.MsgsStateInfo).info;

                const origReqMsgId = this.messagesStateRequests.get(reqMsgId);
                if (!origReqMsgId) {
                    this.messagesStateRequests.remove(reqMsgId);
                    break;
                }

                const msg = this.messagesAwaitingResponse.get(origReqMsgId);
                if (!msg) {
                    this.messagesStateRequests.remove(reqMsgId);
                    break;
                }

                if (info.bytes[0] >= 4) {
                    const msgContainer = new MTProto.MsgContainer([
                        new MTProto.Message(
                            msg.messageId,
                            msg.sequenceNumber,
                            msg.content)
                    ]);
                    this.send(msgContainer);
                } else {
                    const onResult = this.onResults.get(origReqMsgId);
                    if (onResult) {
                        this.send(msg.content, onResult);
                    }

                    this.messagesAwaitingResponse.remove(origReqMsgId);
                    this.onResults.remove(origReqMsgId);
                }

                this.messagesStateRequests.remove(reqMsgId);
            } break;

            case MTProto.MsgDetailedInfo: {
                const msg = message as MTProto.MsgDetailedInfo;

                // Request to resend only if we haven't received the answer yet
                if (!this.lastServerMessageIds.entries
                        .find(msgId => msgId.equals(msg.answerMsgId))) {
                    this.send(new MTProto.MsgResendReq(
                        new TLVector<TLLong>(msg.answerMsgId)));
                }

                this.messagesStateRequests.remove(msg.msgId);
            } break;

            case MTProto.MsgNewDetailedInfo: {
                const msg = message as MTProto.MsgNewDetailedInfo;

                this.send(new MTProto.MsgResendReq(
                    new TLVector<TLLong>(msg.answerMsgId)));
            } break;

            case MTProto.GzipPacked: {
                const gzipped = message as MTProto.GzipPacked;
                const unpacked = Gzip.decompress(gzipped.packedData.bytes);
                if (!unpacked) break;

                const object = deserializedObject(new ByteStream(unpacked));
                if (!object) break;

                this.processServiceMessage(messageId, object);
            } break;

            case API.UpdatesTooLong:
            case API.UpdateShortMessage:
            case API.UpdateShortChatMessage:
            case API.UpdateShort:
            case API.UpdatesCombined:
            case API.Updates:
            case API.UpdateShortSentMessage: {
                this.acknowledgments.enqueue(messageId);
                if (this.delegate) {
                    this.delegate.receivedUpdates(message);
                }
            } break;

            default: {
                console.debug(`[${this.host}]`, "Ignored message", message);
            } break;
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

            if (this.acknowledgments.length > 0 &&
                !(content instanceof MTProto.MsgContainer)) {
                const contentMessage = new MTProto.Message(
                    reqMsgId,
                    this.newSequenceNumber(isContentRelated),
                    content,
                );

                const ids: TLLong[] = [];
                while (this.acknowledgments.length > 0) {
                    ids.push(this.acknowledgments.dequeue()!);
                }
                const ack = new MTProto.MsgsAck(new TLVector(...ids));
                const ackMessage = new MTProto.Message(
                    this.newMessageId(),
                    this.newSequenceNumber(false),
                    ack);

                return new TLEncryptedMessage(
                    this.authKey,
                    this.serverSalt,
                    this.sessionId,
                    this.newMessageId(),
                    this.newSequenceNumber(false),
                    new MTProto.MsgContainer([contentMessage, ackMessage]));
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

    private newMessageId(): TLLong {
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
        const diff = this.serverTime() - timestamp;

        // Message ids that belong over 30 seconds in the future or
        // over 300 in the past are not valid
        return diff <= (30 * 1000) && diff >= (-300 * 1000);
    }

    private serverTime(): number {
        if (this.timeDifference) {
            return this.clock.timestamp - this.timeDifference;
        }
        return this.clock.timestamp;
    }

     static messageIdForTimestamp(timestamp: number): TLLong {
        // Timestamp * 2^32 as per the MTProto spec
        const now = new BN(timestamp).iushln(30).idivn(1000).imuln(4);
        return new TLLong(Long.fromString(now.toString()));
    }

     static timestampForMessageId(messageId: TLLong): number {
        return new BN(messageId.value.toString())
            .idivn(4).imuln(1000).iushrn(30).toNumber();
    }
}

export interface Request {
    reqMsgId: TLLong,
    content: TLObject,
    onResult?: (_: TLObject | Uint8Array) => void,
}

export interface SessionLegacy {
    requests: Queue<Request>,
    acknowledgments: Queue<TLLong>,
    onResults: HashMap<TLLong, (_: TLObject | Uint8Array) => void>,
    messagesAwaitingResponse: HashMap<TLLong, TLEncryptedMessage>,
}

export interface SessionDelegate {
    sessionClosed: (legacy: SessionLegacy) => void,
    newServerSessionCreated: () => void,
    receivedUpdates: (updates: API.UpdatesType) => void,
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
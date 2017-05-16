import {TLLong} from "../TL/Types/TLLong";
import * as Long from "long";
import {MonotonicClock} from "../MonotonicClock/MonotonicClock";
import {TLObject} from "../TL/Interfaces/TLObject";
import {HashMap} from "../DataStructures/HashMap/HashMap";
import {TLEncryptedMessage} from "../TL/TLEncryptedMessage";
import {Queue} from "../DataStructures/Queue";
import {EvictingQueue} from "../DataStructures/EvictingQueue";
import {Request} from "./Request";
import {MTProto} from "../Codegen/MTProto/MTProtoSchema";
import {TLMessage} from "../TL/TLMessage";
import {ByteStream} from "../DataStructures/ByteStream";
import {SecureRandom} from "../SecureRandom/SecureRandom";

export class Session {
    private readonly sessionId = SecureRandom.bytes(8);
    private readonly clock = new MonotonicClock();

    private readonly requests = new Queue<Request>();
    private readonly acknowledgments = new Queue<TLLong>();
    private readonly onResults = new HashMap<TLLong, (_: TLObject) => void>();
    private readonly messagesAwaitingResponse
        = new HashMap<TLLong, TLEncryptedMessage>();
    private readonly messagesStateRequests = new HashMap<TLLong, TLLong>();
    private readonly lastServerMessageIds = new EvictingQueue<TLLong>(32);

    authKey: Uint8Array | undefined;
    serverSalt: Uint8Array | undefined;

    constructor(private readonly host: string) {

    }

    send(content: TLObject,
         onResult?: (result: TLObject) => void,
         resultTypeDeserialized: Function | undefined = undefined) {
        const reqMsgId = this.newMessageId();
        this.requests.enqueue({
            reqMsgId: reqMsgId,
            content: content,
            onResult: onResult
        });
        this.dispatchOutput();
    }

    close() {

    }

    private dispatchOutput() {
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

            onResult(message.content);
        }
    }

    private processIncomingEncryptedMessage(message: TLEncryptedMessage) {

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

            return new TLEncryptedMessage();
        } else {
            return new TLMessage(reqMsgId, content);
        }
    }

    private newMessageId(): TLLong {
        const now = this.serverTime();
        return Session.messageIdForTimestamp(now);
    }

    private serverTime(): number {
        return this.clock.timestamp;
    }

    private static messageIdForTimestamp(timestamp: number): TLLong {
        // Timestamp * 2^32 as per the MTProto spec
        let now = Long.fromNumber(timestamp, true)
            .mul(Long.ONE.shl(32))
            .div(1000000);
        return new TLLong(now);
    }
}
import {TLSerializable} from "./Interfaces/TLSerializable";
import {ByteStream} from "../DataStructures/ByteStream";
import {TLLong} from "./Types/TLLong";
import {TLObject} from "./Interfaces/TLObject";
import {TLInt} from "./Types/TLInt";
import {concat} from "./BytesConcat";
import {deserializedObject} from "./TLObjectDeserializer";
import * as Long from "long";

export class TLMessage implements TLSerializable {
    static deserialized(data: ByteStream): TLMessage | undefined {
        const _ = TLLong.deserialized(data);
        if (!_) return undefined;

        const messageId = TLLong.deserialized(data);
        if (!messageId) return undefined;

        const contentLength = TLInt.deserialized(data);
        if (!contentLength) return undefined;

        if (contentLength.value !== (data.bytes.length - data.cursor)) {
            return undefined;
        }

        const content = deserializedObject(data);
        if (!content) return undefined;

        return new TLMessage(messageId, content);
    }

    serialized(): Uint8Array {
        const content = this.content.serialized();

        const authKeyId = new TLLong(Long.ZERO).serialized();
        const messageId = this.messageId.serialized();
        const length = new TLInt(content.length).serialized();

        return concat(authKeyId, messageId, length, content);
    }

    constructor(readonly messageId: TLLong, readonly content: TLObject) {}
}
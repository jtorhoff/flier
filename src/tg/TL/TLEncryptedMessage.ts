import {TLSerializable} from "./Interfaces/TLSerializable";
import {ByteStream} from "../DataStructures/ByteStream";
import {TLLong} from "./Types/TLLong";
import {TLInt} from "./Types/TLInt";
import {TLObject} from "./Interfaces/TLObject";
import {concat} from "../Utils/BytesConcat";
import {sha1} from "../SHA/SHA";
import {IGE} from "../AES/IGE";
import {deserializedObject} from "./TLObjectDeserializer";

export class TLEncryptedMessage implements TLSerializable {
    static deserialized(data: ByteStream,
                        authKey: Uint8Array,
                        serverSalt: Uint8Array,
                        sessionId: Uint8Array): TLEncryptedMessage | undefined {
        const authKeyId = data.read(8);
        if (!authKeyId) return undefined;

        if (!constEql(authKeyId, sha1(authKey).slice(12,))) {
            return undefined;
        }

        const messageKey = data.read(16);
        if (!messageKey) return undefined;

        const payload = data.bytes.slice(data.cursor,);
        const {key, iv} = aesParams(messageKey, authKey, false);
        const decrypted = new IGE(key.buffer)
            .decrypt(payload.buffer, iv.buffer);
        const bytes = new ByteStream(new Uint8Array(decrypted));

        const salt = bytes.read(8);
        if (!salt) return undefined;

        if (!constEql(salt, serverSalt)) {
            return undefined;
        }

        const sId = bytes.read(8);
        if (!sId) return undefined;

        if (!constEql(sId, sessionId)) {
            return undefined;
        }

        const messageId = TLLong.deserialized(bytes);
        if (!messageId) return undefined;

        const sequenceNumber = TLInt.deserialized(bytes);
        if (!sequenceNumber) return undefined;

        const len = TLInt.deserialized(bytes);
        if (!len) return undefined;

        const lenDiff = (bytes.bytes.length - bytes.cursor) - len.value;
        if (len.value % 4 !== 0 || lenDiff < 0 || lenDiff > 16) {
            return undefined;
        }

        const hash = sha1(
            new Uint8Array(decrypted.slice(0, decrypted.byteLength - lenDiff)));
        if (!constEql(hash.slice(4,), messageKey)) {
            return undefined;
        }

        const content = deserializedObject(bytes);
        if (!content) return undefined;

        return new TLEncryptedMessage(
            authKey, salt, sessionId, messageId, sequenceNumber, content);
    }

    serialized(): Uint8Array {
        const messageId = this.messageId.serialized();
        const sequenceNumber = this.sequenceNumber.serialized();
        const content = this.content.serialized();
        const len = new TLInt(content.length).serialized();

        const toEncrypt = concat(
            this.serverSalt,
            this.sessionId,
            messageId,
            sequenceNumber,
            len,
            content,
        );

        const messageKey = sha1(toEncrypt).slice(4,);
        const {key, iv} = aesParams(messageKey, this.authKey, true);
        const encrypted = new IGE(key.buffer)
            .encrypt(toEncrypt.buffer, iv.buffer);
        const authKeyId = sha1(this.authKey).slice(12,);

        return concat(authKeyId, messageKey, new Uint8Array(encrypted));
    }

    constructor(readonly authKey: Uint8Array,
                readonly serverSalt: Uint8Array,
                readonly sessionId: Uint8Array,
                readonly messageId: TLLong,
                readonly sequenceNumber: TLInt,
                readonly content: TLObject) {}
}

const aesParams = (messageKey: Uint8Array,
                   authKey: Uint8Array,
                   outgoing: boolean): {key: Uint8Array, iv: Uint8Array} => {
    const x = outgoing ? 0 : 8;

    const a = sha1(concat(messageKey, authKey.slice(x, x + 32)));
    const b = sha1(concat(authKey.slice(x + 32, x + 48),
                          messageKey,
                          authKey.slice(x + 48, x + 64)));
    const c = sha1(concat(authKey.slice(x + 64, x + 96), messageKey));
    const d = sha1(concat(messageKey, authKey.slice(x + 96, x + 128)));

    const key = concat(a.slice(0, 8), b.slice(8,), c.slice(4, 16));
    const iv = concat(a.slice(8,), b.slice(0, 8), c.slice(16,), d.slice(0, 8));

    return {key, iv};
};

/**
 * Constant-time comparison.
 * @param a
 * @param b
 * @returns {boolean}
 */
const constEql = (a: Uint8Array, b: Uint8Array): boolean => {
    if (a.length !== b.length) {
        throw new RangeError("The values to compare must have equal length");
    }

    let result = 0;
    for (let i = 0; i < a.length; i++) {
        result |= a[i] ^ b[i];
    }

    return result === 0;
};
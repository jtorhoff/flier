/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { IGE } from "../AES/IGE";
import { ByteStream } from "../DataStructures/ByteStream";
import { SecureRandom } from "../SecureRandom/SecureRandom";
import { sha1, sha256 } from "../SHA/SHA";
import { concat } from "../Utils/BytesConcat";
import { TLObject } from "./Interfaces/TLObject";
import { TLSerializable } from "./Interfaces/TLSerializable";
import { deserializedObject } from "./TLObjectDeserializer";
import { TLInt } from "./Types/TLInt";
import { TLLong } from "./Types/TLLong";

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
        if (len.value % 4 !== 0 || lenDiff < 12 || lenDiff > 1024) {
            return undefined;
        }

        const hash = sha256(
            concat(authKey.slice(96, 128),
                new Uint8Array(decrypted))).slice(8, 24);
        if (!constEql(hash, messageKey)) {
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

        // Choose padding randomly so that 12 <= padLen <= toEncrypt.length / 4 <= 1024
        // and padLen mod 16 = 0.
        const r = rand(12, toEncrypt.length >>> 2);
        const padLen = Math.min(((((-toEncrypt.length - r) % 16) + 16) % 16) + r, 1024);
        const padding = SecureRandom.bytes(padLen);
        const payload = concat(toEncrypt, padding);

        const messageKey = sha256(concat(this.authKey.slice(88, 120), payload)).slice(8, 24);
        const {key, iv} = aesParams(messageKey, this.authKey, true);
        const encrypted = new IGE(key.buffer)
            .encrypt(payload.buffer, iv.buffer);
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

    const a = sha256(concat(messageKey, authKey.slice(x, x + 36)));
    const b = sha256(concat(authKey.slice(x + 40, x + 76), messageKey));
    const key = concat(a.slice(0, 8), b.slice(8, 24), a.slice(24, 32));
    const iv = concat(b.slice(0, 8), a.slice(8, 24), b.slice(24, 32));

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

const rand = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
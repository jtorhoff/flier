/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { IGE } from "../AES/IGE";
import { sha1 } from "../SHA/SHA";
import { concat } from "../Utils/BytesConcat";
import { TLObject } from "./Interfaces/TLObject";
import { TLSerializable } from "./Interfaces/TLSerializable";
import { TLInt } from "./Types/TLInt";
import { TLLong } from "./Types/TLLong";

export class TLLegacyEncryptedMessage implements TLSerializable {
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
        const {key, iv} = aesParams(messageKey, this.authKey);
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
                   authKey: Uint8Array): {key: Uint8Array, iv: Uint8Array} => {
    const a = sha1(concat(messageKey, authKey.slice(0, 32)));
    const b = sha1(concat(authKey.slice(32, 48),
                          messageKey,
                          authKey.slice(48, 64)));
    const c = sha1(concat(authKey.slice(64, 96), messageKey));
    const d = sha1(concat(messageKey, authKey.slice(96, 128)));

    const key = concat(a.slice(0, 8), b.slice(8,), c.slice(4, 16));
    const iv = concat(a.slice(8,), b.slice(0, 8), c.slice(16,), d.slice(0, 8));

    return {key, iv};
};
/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as Long from "long";
import { ByteStream } from "../DataStructures/ByteStream";
import { concat } from "../Utils/BytesConcat";
import { TLObject } from "./Interfaces/TLObject";
import { TLSerializable } from "./Interfaces/TLSerializable";
import { deserializedObject } from "./TLObjectDeserializer";
import { TLInt } from "./Types/TLInt";
import { TLLong } from "./Types/TLLong";

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
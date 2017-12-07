/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { ByteStream } from "../../DataStructures/ByteStream";
import { TLSerializable } from "../Interfaces/TLSerializable";
import { TLBytes } from "./TLBytes";

export class TLString implements TLSerializable {
    static readonly empty = new TLString("");

    static deserialized(data: ByteStream): TLString | undefined {
        const bytes = TLBytes.deserialized(data);
        if (!bytes) return undefined;

        const string = decoder.decode(bytes.bytes);

        return new TLString(string);
    }

    serialized(): Uint8Array {
        return new TLBytes(encoder.encode(this.string)).serialized();
    }

    constructor(readonly string: string) {}
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();
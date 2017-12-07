/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { ByteStream } from "../../DataStructures/ByteStream";
import { Hashable } from "../../DataStructures/HashMap/Hashable";
import { TLSerializable } from "../Interfaces/TLSerializable";

export class TLInt implements TLSerializable, Hashable {
    readonly value: number;

    static deserialized(data: ByteStream): TLInt | undefined {
        const bytes = data.read(4);
        if (!bytes) return undefined;

        const value =
            (bytes[3] << 24) |
            (bytes[2] << 16) |
            (bytes[1] << 8)  |
            (bytes[0]);

        return new TLInt(value);
    }

    serialized(): Uint8Array {
        const bytes = new Uint8Array(4);

        bytes[3] = (this.value >> 24)   & 0xff;
        bytes[2] = (this.value >> 16)   & 0xff;
        bytes[1] = (this.value >> 8)    & 0xff;
        bytes[0] =  this.value          & 0xff;

        return bytes;
    }

    get hashValue(): number {
        return this.value;
    }

    equals(to: TLInt): boolean {
        return this.value === to.value;
    }

    constructor(value: number) {
        if (isNaN(value)) {
            throw new Error("value can't be NaN");
        }
        // Force value to a 32-bit integer
        this.value = value | 0;
    }
}
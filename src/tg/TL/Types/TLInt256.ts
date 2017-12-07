/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { ByteStream } from "../../DataStructures/ByteStream";
import { TLSerializable } from "../Interfaces/TLSerializable";

export class TLInt256 implements TLSerializable {
    readonly value: Uint8Array;

    static deserialized(data: ByteStream): TLInt256 | undefined {
        const bytes = data.read(32);
        if (!bytes) return undefined;

        return new TLInt256(bytes);
    }

    serialized(): Uint8Array {
        return this.value;
    }

    equals(to: TLInt256): boolean {
        for (let i = 0; i < this.value.length; i++) {
            if (this.value[i] !== to.value[i]) {
                return false;
            }
        }

        return true;
    }

    constructor(value: Uint8Array) {
        if (value.length !== 32) {
            throw new TypeError();
        }
        this.value = value;
    }
}
/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { ByteStream } from "../../DataStructures/ByteStream";
import { TLSerializable } from "../Interfaces/TLSerializable";

export class TLDouble implements TLSerializable {
    static deserialized(data: ByteStream): TLDouble | undefined {
        const bytes = data.read(8);
        if (!bytes) return undefined;

        return new TLDouble(new Float64Array(bytes.buffer)[0]);
    }

    serialized(): Uint8Array {
        const buffer = new ArrayBuffer(8);
        const doubleView = new Float64Array(buffer);
        doubleView[0] = this.value;

        return new Uint8Array(buffer);
    }

    get hashValue(): number {
        return this.value | 0;
    }

    constructor(readonly value: number) {}
}
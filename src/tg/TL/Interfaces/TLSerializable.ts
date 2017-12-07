/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { ByteStream } from "../../DataStructures/ByteStream";

export abstract class TLSerializable {
    static deserialized<T>(
        this: { new(): T }, data: ByteStream): T | undefined {
        throw new TypeError();
    }

    abstract serialized(): Uint8Array;
}
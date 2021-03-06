/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export class ByteStream {
    readonly bytes: Uint8Array;
    private _cursor: number = 0;

    constructor(bytes: Uint8Array) {
        this.bytes = bytes;
    }

    read(count: number): Uint8Array | undefined {
        if (this._cursor + count > this.bytes.length) {
            return undefined;
        }
        const slice = this.bytes.slice(this._cursor, this._cursor + count);
        this._cursor += count;

        return slice;
    }

    moveCursorBy(delta: number) {
        const update = this._cursor + delta;
        if (update < 0 || update > this.bytes.length) {
            throw new RangeError();
        }
        this._cursor = update;
    }

    get cursor(): number {
        return this._cursor;
    }
}
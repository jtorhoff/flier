/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as pako from "pako";

export namespace Gzip {
    export const compress = (data: Uint8Array): Uint8Array | undefined => {
        const deflate = new pako.Deflate({
            level: 9,
            windowBits: 15 + 16,
            memLevel: 9,
        });
        deflate.push(data, true);
        if (deflate.err) {
            return undefined;
        }

        return deflate.result as Uint8Array;
    };

    export const decompress = (data: Uint8Array): Uint8Array | undefined => {
        const inflate = new pako.Inflate({
            windowBits: 15 + 16,
        });
        inflate.push(data, true);
        if (inflate.err) {
            return undefined;
        }

        return inflate.result as Uint8Array;
    };
}
/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export namespace SecureRandom {
    export const bytes = (count: number): Uint8Array => {
        const bytes = new Uint8Array(count);

        if (!crypto || !crypto.getRandomValues) {
            throw new Error("Your browser doesn't support Web Crypto API");
        }
        crypto.getRandomValues(bytes);

        return bytes;
    };
}
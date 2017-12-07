/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export const combineHash = (...hashes: number[]) => {
    let seed = hashes[0] || 0;
    for (let i = 1; i < hashes.length; i++) {
        seed ^= hashes[i] + 0x9e3779b9 + (seed << 6) + (seed >> 2);
    }

    return seed;
};
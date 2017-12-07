/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export const decodePCM = (pcm: Uint8Array): Array<number> => {
    const valuesCount = (pcm.length * 8 / 5) | 0;

    const result = new Array(valuesCount);
    for (let i = 0; i < valuesCount; i++) {
        const byteIndex = ((i * 5) / 8) | 0;
        const bitShift = ((i * 5) % 8) | 0;
        result[i] = (pcm[byteIndex] >> bitShift) & 0x1f;
    }

    return result;
};
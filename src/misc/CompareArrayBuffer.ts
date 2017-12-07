/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export const buffersEqual = (lhs?: ArrayBuffer, rhs?: ArrayBuffer) => {
    if (typeof lhs === "undefined" || typeof rhs === "undefined") {
        return false;
    }
    if (lhs.byteLength !== rhs.byteLength) {
        return false;
    }

    const a = new Uint32Array(lhs);
    const b = new Uint32Array(rhs);

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }

    return true;
};
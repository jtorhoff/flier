/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as fastSHA256 from "fast-sha256";
import * as Rusha from "Rusha";

const rusha = new Rusha();

export const sha1 = (bytes: Uint8Array): Uint8Array => {
    const buffer = rusha.rawDigest(bytes).buffer;
    return new Uint8Array(buffer);
};

export const sha256 = (bytes: Uint8Array): Uint8Array => {
    return fastSHA256.hash(bytes);
};
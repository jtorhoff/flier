/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

declare module "rusha" {
    interface Rusha {
        new(): this;
        rawDigest(buffer: Uint8Array): Uint32Array;
    }

    const Rusha: Rusha;
    export = Rusha;
}
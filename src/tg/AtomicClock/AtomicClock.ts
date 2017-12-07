/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export class AtomicClock {
    private lastTimestamp = 0;

    get timestamp(): number {
        let now: number;
        do {
            now = Date.now();
        } while (now === this.lastTimestamp);
        this.lastTimestamp = now;

        return now;
    }
}
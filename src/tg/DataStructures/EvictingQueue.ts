/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Queue } from "./Queue";


export class EvictingQueue<T> extends Queue<T> {
    constructor(readonly maxLength: number) {
        super();
    }

    enqueue(item: T) {
        super.enqueue(item);
        while (this.length > this.maxLength) {
            this.dequeue();
        }
    }
}
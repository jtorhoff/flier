/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * A queue implementation with amortised O(1) dequeuing.
 * Based on the idea by Stephen Morley - http://code.stephenmorley.org/.
 */
export class Queue<T> {
    private data: (T | undefined)[];
    private offset = 0;

    constructor(elements: T[] = []) {
        this.data = elements;
    }

    get first(): T | undefined {
        return this.data[this.offset];
    }

    get length(): number {
        return this.data.length - this.offset;
    }

    get entries(): T[] {
        return this.data.slice(this.offset) as T[];
    }

    enqueue(item: T) {
        this.data.push(item);
    }

    dequeue(): T | undefined {
        const first = this.first;
        if (!first) return undefined;

        this.data[this.offset] = undefined;
        this.offset++;

        if (this.offset * 2 >= this.data.length) {
            this.data = this.data.slice(this.offset,);
            this.offset = 0;
        }

        return first;
    }
}
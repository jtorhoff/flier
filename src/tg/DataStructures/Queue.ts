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

    get size(): number {
        return this.data.length - this.offset;
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
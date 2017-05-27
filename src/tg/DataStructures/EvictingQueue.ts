import {Queue} from "./Queue";


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
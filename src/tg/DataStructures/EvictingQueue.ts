import {Queue} from "./Queue";


export class EvictingQueue<T> extends Queue<T> {
    constructor(readonly maxSize: number) {
        super();
    }

    enqueue(item: T) {
        super.enqueue(item);
        while (this.size > this.maxSize) {
            this.dequeue();
        }
    }
}
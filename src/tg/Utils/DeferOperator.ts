import { Observable } from "rxjs/Observable";
import { Operator } from "rxjs/Operator";
import { Subscriber } from "rxjs/Subscriber";
import { TeardownLogic } from "rxjs/Subscription";

export function defer<T>(this: Observable<T>,
                         trigger: Observable<boolean>): Observable<T> {
    return this.lift(new DeferOperator<T>(trigger));
}

class DeferOperator<T> implements Operator<T, T> {
    constructor(private trigger: Observable<boolean>) {}

    call(subscriber: Subscriber<T>, source: any): TeardownLogic {
        return source.subscribe(
            new DeferSubscriber<T>(subscriber, this.trigger));
    }
}

class DeferSubscriber<T> extends Subscriber<T> {
    private buffer: T[] = [];
    private propagate: boolean = false;

    constructor(destination: Subscriber<T>,
                private readonly trigger: Observable<boolean>) {
        super(destination);
        trigger.subscribe(
            shouldPropagate => {
                if (shouldPropagate) {
                    for (let value of this.buffer) {
                        destination.next(value);
                    }
                    this.buffer = [];
                }
                this.propagate = shouldPropagate;
            }, error => {
                destination.error(error);
            }, () => {
                destination.complete();
            });
    }

    _next(value: T) {
        if (this.propagate && this.destination.next) {
            this.destination.next(value);
        } else {
            this.buffer.push(value);
        }
    }

    _complete() {

    }
}
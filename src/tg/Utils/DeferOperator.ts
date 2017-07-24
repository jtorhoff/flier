import { Observable } from "rxjs/Observable";
import { Operator } from "rxjs/Operator";
import { Subscriber } from "rxjs/Subscriber";
import { TeardownLogic } from "rxjs/Subscription";

/**
 * Defers the propagation of values unless a true value is received by
 * the `trigger` signal. If a false value is received, the values of this
 * observable are again deferred until a true value is received.
 *
 * @param trigger
 * @param unless A callback that's called on every emitted value,
 * if it returns true, the value is propagated regardless
 * of the value received by the `trigger` observable.
 *
 * If no callback is specified, the callback return false for every value.
 * @returns {Observable<R>}
 */
export function defer<T>(this: Observable<T>,
                         trigger: Observable<boolean>,
                         unless: (_: T) => boolean = () => false): Observable<T> {
    return this.lift(new DeferOperator<T>(trigger, unless));
}

class DeferOperator<T> implements Operator<T, T> {
    constructor(private trigger: Observable<boolean>,
                private filter: (_: T) => boolean) {
    }

    call(subscriber: Subscriber<T>, source: any): TeardownLogic {
        return source.subscribe(
            new DeferSubscriber<T>(subscriber, this.trigger, this.filter));
    }
}

class DeferSubscriber<T> extends Subscriber<T> {
    private buffer: T[] = [];
    private propagate: boolean = false;

    constructor(destination: Subscriber<T>,
                private readonly trigger: Observable<boolean>,
                private readonly filter: (_: T) => boolean) {
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
        if ((this.propagate || this.filter(value)) && this.destination.next) {
            this.destination.next(value);
        } else {
            this.buffer.push(value);
        }
    }

    _complete() {

    }
}

// Add custom defer operator to the observable.
Observable.prototype.defer = defer;
declare module "rxjs/Observable" {
    interface Observable<T> {
        defer: typeof defer;
    }
}
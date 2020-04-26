import { Observable, Subscriber, Unsubscribable } from "rxjs";

export function sum(a: number, b: number) {
    return a + b;
}

export {delay} from 'rxjs/operators'

class SkipLimit extends Subscriber<any> {

    private _interval: number = 1;
    private _count: number = 1;

    constructor(subscriber: Subscriber<any>, private _skip: number, private _limit: number) {
        super(subscriber);
    }

    public next(value: number): void {
        const borderLeft: number = this._interval * (this._skip + this._limit) - this._limit;
        const borderRight: number = borderLeft + this._limit;
        if (borderLeft < this._count && this._count <= borderRight) {
            super.next(value);
            this._count++;
            if (borderRight < this._count) {
                this._interval++;
            }
            return
        }
        this._count++;
    }
}

export function skipLimit(skip: number, limit: number) {
    return (source: Observable<any>) => {
        return source.lift({
            call(subscriber: Subscriber<any>, source: any): Unsubscribable | Function | void {
                source.subscribe(new SkipLimit(subscriber, skip, limit))
            }
        })
    }
}

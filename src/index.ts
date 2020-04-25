import { interval, Observable, of, Subscriber, Unsubscribable } from "rxjs";
import { filter } from "rxjs/operators";

// function doNothing(source: Observable<any>) {
//     return source;
// }

// function toText(source: Observable<any>) {
//     return new Observable((subscriber)=>{
//         subscriber.next('Rx JS is awesome');
//         subscriber.complete()
//     })
// }
//
// interval(1000)
//     .pipe(toText)
//     .subscribe((v) => {
//         console.log(v);
//     })


// const o$ = new Observable();
// o$.source = interval(1000)
// o$.operator = {
//     call(subscriber: Subscriber<unknown>, source: any): Unsubscribable | Function | void {
//         source.subscribe(subscriber)
//     }
// }
//
class DoubleSubscriber extends Subscriber<number> {
    next(value: number): void {
        super.next(value * 2);
    }
}

//
//
// of(1, 2, 3, 4)
//     .subscribe(new DoubleSubscriber((v) => console.log(v)))

// const double = (source: Observable<any>) => {
// //     const o$ = new Observable();
// //     o$.source = source;
// //     o$.operator = {
// //         call(subscriber: Subscriber<unknown>, source: any): Unsubscribable | Function | void {
// //             source.subscribe(new DoubleSubscriber(subscriber))
// //         }
// //     }
// //     return o$;
// // }

const double = (source: Observable<any>) => {
    return source.lift({
        call(subscriber: Subscriber<unknown>, source: any): Unsubscribable | Function | void {
            source.subscribe(new DoubleSubscriber(subscriber))
        }
    });
}

const pipe = (...fns: Function[]) => (source: Observable<any>) => fns.reduce((acc: any, fn) => {
    return fn(acc)
}, source);

const doubleWithFilter = pipe(double, filter((v: number) => v % 3 === 0));


interval(1000)
    .pipe(
        doubleWithFilter
    )
    .subscribe((v) => {
        console.log(v);
    })

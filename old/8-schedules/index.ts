// console.log('start');
// setTimeout(()=>console.log('t1'));
// setTimeout(()=>console.log('t2'));
// Promise.resolve().then(()=>console.log('p1'));
// Promise.resolve().then(()=>console.log('p2'));
// console.log('end')
//
//
// /*
//     start -----  t1 ----- t2
//     end
//     ----
//     p1
//     p2
//  */

// import { asyncScheduler, of } from "rxjs";
// import { asap } from "rxjs/internal/scheduler/asap";
// import { queue } from "rxjs/internal/scheduler/queue";
//
// console.log('start');
// of(1, 2, 3, 4, 5 )
//     .subscribe((v) => {
//         console.log(v);
//     });
// console.log('end');


import { combineLatest, from, of, Subject } from "rxjs";
import { map, observeOn, subscribeOn, take, tap } from "rxjs/operators";
import { asap } from "rxjs/internal/scheduler/asap";
import { queue } from "rxjs/internal/scheduler/queue";
import { async } from "rxjs/internal/scheduler/async";

// const a$ = from([1, 2], asap);
// const b$ = of(10);
//
// const c$ = combineLatest([a$, b$])
//     .pipe(
//         map(([x, y]) => x + y)
//     );
//
//
// c$.subscribe((sum)=>{
//     console.log(sum)
// })


// const signal: Subject<number> = new Subject();
// const calc = (count: number) => console.log('do some calc with ', count);
// let count = 1;
// console.log('start');
// signal
//     .pipe(
//         observeOn(queue),
//         take(1600)
//     )
//     .subscribe((count: number) => {
//         calc(count);
//         signal.next(count++)
//     })
// signal.next(count++)
// console.log('stop');


console.log('start');
setTimeout(() => console.log('It will be run after current Macrotask'))

of(1, 2, 3)
    .pipe(
        tap((v) => console.log('tap', v)),
        observeOn(async)
    )
    .subscribe((v) => {
        console.log('Value', v);
        Promise.resolve().then(() => console.log('Microtask value', v))
        setTimeout(() => console.log('Macrotask value', v))
    })
console.log('end');

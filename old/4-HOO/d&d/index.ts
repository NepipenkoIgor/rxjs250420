// import { dragElement$ } from "./drag-and-drop";
// import { Observable } from "rxjs";
//
// dragElement$.subscribe()

// const sequence$ = new Observable((subscriber) => {
//     let count = 1;
//     const intId = setInterval(() => {
//         subscriber.next(count++)
//     }, 1000)
//
//     return () => {
//         console.log('Unsibscribed')
//         clearInterval(intId)
//     }
// })
//
// const subscription = sequence$.subscribe((v) => {
//     console.log(v);
// });
//
// setTimeout(()=> {
//     subscription.unsubscribe();
// }, 5000)


import { fromEvent, interval, of } from "rxjs";
import { concatMap, map, mergeAll, mergeMap, pluck, switchMap, exhaust, exhaustMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

const inputRef = document.querySelector('input') as HTMLInputElement;
const source$ = fromEvent(inputRef, 'input')
    .pipe(
        pluck('target', 'value'),
        exhaustMap((v) => {
            return ajax(`http://learn.javascript.ru/courses/groups/api/participants?key=1glj803&text=${v}`);
        })
        // mergeMap = map + mergeAll;
        // switchMap = map + switchAll;
        // сoncatMap = map + сoncatAll;
        // exhaustMap = map + exhaust;
    );

// source$.subscribe((v) => {
//     console.log(v);
// })

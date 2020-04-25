import { defer, from, fromEvent, generate, iif, of, range, timer } from "rxjs";
import { concatAll, map, pluck, switchMap, take, toArray } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

// const sequence$ = of(1, 2, 3, 4);
//
// sequence$.subscribe((v) => {
//     console.log(v);
// });


// const sequence$ = from(
//     fetch('http://learn.javascript.ru/courses/groups/api/participants?key=1glj803')
//         .then((res) => res.json())
// );
// const sequence$ = ajax(
//     'http://learn.javascript.ru/courses/groups/api/participants?key=1glj803'
// );
//
// sequence$
//     .pipe(
//         map((res) => res.response), // [{}, {}, {}]
//         concatAll(), // {}, {}, {}, {},
//         map((user: any) => `${user.firstName} ${user.surname}`),  // '', ''
//         toArray() // ['', '', '']
//     )
//     .subscribe((v) => {
//         console.log(v);
//     });

// range(3, 4)
//     .subscribe((v) => {
//         console.log(v);
//     })

// timer(4000, 1000)
//     // .pipe(
//     //     map(() => ({
//     //         name: 'Ihor'
//     //     }))
//     // )
//     .subscribe((v) => {
//         console.log(v);
//     })


// generate(1, (v) => v < 4, (v) => v + 0.5)
//     .subscribe((v) => {
//         console.log(v);
//     })

const random = Math.round(Math.random() * 10);
// iif(() => {
//     return random < 5;
// }, of(`First, number is ${random}`), of(`Second, number is ${random}`))
//     .subscribe((v) => {
//         console.log(v)
//     })

// defer(() => {
//     return random >= 5
//         ? random >= 8
//             ? of(`First, number is ${random}`)
//             : of(`Second, number is ${random}`)
//         : of(`Third, number is ${random}`)
// })
//     .subscribe((v) => {
//         console.log(v);
//     })
// const el = document.querySelector('input') as HTMLInputElement
// fromEvent<KeyboardEvent>(el, 'input')
//     .pipe(take(3), pluck('target', 'value'))
//     .subscribe((e: any) => {
//         console.log(e);
//     })
//

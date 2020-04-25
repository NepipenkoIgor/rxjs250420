import { interval } from "rxjs";
import { filter, map, skip, take, tap } from "rxjs/operators";

const sequence1$ = interval(1000);

/*
 sequence1$: ---0---1---2---3---4---
     skip(1)
             -------1---2---3---4---
     filter((x) => x % 2 === 0),
             -----------2-------4---
     tap((x)=> {console.log(x); return x*2})
             -----------2-------4---
     map((x)=>x**2)
             -----------4-------16---
     take(2)
             -----------4-------16|
     tap((x)=> {console.log(x); return x*2})
 sequence2$: -----------4-------16|
 */

const sequence2$ = sequence1$
    .pipe(
        skip(1),
        filter((x) => x % 2 === 0),
        tap((x) => {
            console.log('in Tap 1', x);
            return x * 2
        }),
        map((x) => x ** 2),
        take(2),
        tap((x) => {
            console.log('in Tap 2', x);
            return x * 2
        }),
    );


sequence2$.subscribe((v) => {
    console.log(v);
})

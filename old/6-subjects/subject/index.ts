import './component1';
import './component2';
import { observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

// Subject = Observable + Observer

// import { BehaviorSubject, ReplaySubject, Subject } from "rxjs";
//
// const sequence$$ = new ReplaySubject();
// sequence$$.next('Hi');
// sequence$$.next('RxJS');
// sequence$$.next('Awesome');
// const subscription = sequence$$.subscribe((v) => {
//     console.log('Sub 1', v)
// })
// subscription.unsubscribe();
//
// sequence$$.next('All');
// sequence$$.next('RxJS');
// sequence$$.next('Awesome');
// sequence$$.subscribe((v) => {
//     console.log('Sub 2', v)
// })
// sequence$$.next('RxJS');
// sequence$$.next('Awesome');


// class Unsubscriber {
//     protected sequence$$ = new Subject()
//
//     ngOnDestroy() {
//         this.sequence$$.next(true);
//         this.sequence$$.complete();
//     }
// }
//
//
// class Component extends Unsubscriber {
//     ngOnInit() {
//         observable.pipe(takeUntil(this.sequence$$))
//     }
// }

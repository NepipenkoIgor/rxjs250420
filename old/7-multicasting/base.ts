import { ConnectableObservable, interval, ReplaySubject, Subject } from "rxjs";
import { multicast, publish, publishReplay, refCount, share } from "rxjs/operators";

// const controlSequence = new ReplaySubject(1)

const sequence$ = interval(1000)
    .pipe(
        // multicast(controlSequence)
        // publish(),
        // refCount()
        share()
    ) //as ConnectableObservable<any>;

const subscribtion = sequence$.subscribe((v) => {
    console.log('Sub 1', v);
})

setTimeout(()=>{
    //subscribtion.unsubscribe();
}, 3000)

setTimeout(()=>{

    sequence$.subscribe((v) => {
        console.log('Sub 2', v);
    })

}, 5000)

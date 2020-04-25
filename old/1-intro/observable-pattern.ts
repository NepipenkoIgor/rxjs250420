class Observable<T> {
    private readonly _subscribe: any;


    constructor(subscribe: any) {
        this._subscribe = subscribe;
    }


    subscribe(next: (param: T) => void, error?: (error: any) => void, complete?: () => void) {
        return this._subscribe({
            next,
            error,
            complete
        })
    }
}


const sequence = new Observable<number>((subscriber: any) => {
    let cursor = 1;
    console.log('init observable');
    const intervalId = setInterval(() => {
        subscriber.next(cursor++);
        if (cursor === 10) {
            clearInterval(intervalId);
            subscriber.complete();
        }
    }, 1000);
})


setTimeout(() => {
    sequence.subscribe((v: number) => {
        console.log(v)
    }, (_err) => {
    }, () => {
        console.log('complete')
    })
}, 5000)

setTimeout(() => {
    sequence.subscribe((v: number) => {
        console.log(v)
    }, (_err) => {
    }, () => {
        console.log('complete')
    })
}, 20000)

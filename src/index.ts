// import { Observable } from 'rxjs'
//
// const sequence$ = new Observable<number>((subscriber: any) => {
//     let cursor = 1;
//     console.log('init observable');
//     const intervalId = setInterval(() => {
//         subscriber.next(cursor++);
//         if (cursor === 10) {
//             clearInterval(intervalId);
//             subscriber.complete();
//         }
//     }, 1000);
// })
//
//
// setTimeout(() => {
//     sequence$.subscribe((v: number) => {
//         console.log('Sub 1', v)
//     }, (_err) => {
//     }, () => {
//         console.log('complete')
//     })
// }, 5000)
//
// setTimeout(() => {
//     sequence$.subscribe((v: number) => {
//         console.log('Sub 2', v)
//     }, (_err) => {
//     }, () => {
//         console.log('complete')
//     })
// }, 7000)


import { Observable } from "rxjs";

const socket: WebSocket = new WebSocket('wss://echo.websocket.org');

const sequence$ = new Observable((subscriber) => {
    socket.addEventListener('message', (e) => subscriber.next(e))
    return socket.close();
});

socket.addEventListener('open', () => {
    console.log('socket opened');
    let count = 0;
    setInterval(() => {
        socket.send((count++).toString())
    }, 1000)
})

const subscription = sequence$.subscribe((v) => {
    console.log(v)
})

// subscription.unsubscribe()

import { AsyncSubject, Observable } from "rxjs";
import { ajax } from "rxjs/ajax";

// const sequence$ = new AsyncSubject();
//
// sequence$.subscribe((v) => {
//     console.log('Sub 1', v)
// });
//
// sequence$.next('RxJS');
// sequence$.next('Awesome');
//
// sequence$.complete();
//
//
// setTimeout(() => {
//     sequence$.subscribe((v) => {
//         console.log('Sub 2', v)
//     });
// }, 5000)


function getUsers(url: string) {
    let subject: AsyncSubject<any>;
    return new Observable((subscriber) => {
        if (!subject) {
            subject = new AsyncSubject();
            ajax(url).subscribe(subject);
        }
        return subject.subscribe(subscriber)
    })
}

const users = getUsers('http://learn.javascript.ru/courses/groups/api/participants?key=1glj803')

users.subscribe((users) => {
    console.log(users);
})

setTimeout(() => {
    users.subscribe((users) => {
        console.log(users);
    })
}, 7000)

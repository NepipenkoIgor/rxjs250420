import { EMPTY, interval, of, throwError, zip } from "rxjs";
import { catchError, delay, map, retry, retryWhen, switchMap, tap } from "rxjs/operators";

const sequence1$ = interval(1000);
const sequence2$ = of('1', '2', '3', 4, '5', '6', '7');
const sequence$ = zip(sequence1$, sequence2$);

sequence$
    .pipe(
        switchMap(([, y]) => {
            return of(y)
                .pipe(
                    map((value) => {
                        return (value as any).toUpperCase()
                    }),
                    tap(()=>{
                        console.log('next after map')
                    }),
                    catchError((err) => {
                        // console.log(err);
                        return EMPTY //of('N')
                    })
                )
        }),
    )
    .subscribe((v) => {
        console.log(v);
    }, (err) => {
        console.log('ERR CB', err)
    }, () => {
        console.log('complete')
    })


of()
    .subscribe((v) => {
        console.log(3333, v)
    }, (err) => {
    }, () => {
        console.log('complete 1111')
    })


// const pingEpic = action$ => action$.pipe(
//     ofType(GetProductsPending),
//     switchMap(() => axios.pipe(
//         map(()=>GetProductsSuccess)
//         catchError((err) => {
//             // console.log(err);
//             return EMPTY //of('N')
//         })
//     ))
//
// );

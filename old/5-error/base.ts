import { interval, of, zip } from "rxjs";
import { catchError, delay, map, retry, retryWhen, tap } from "rxjs/operators";

const sequence1$ = interval(1000);
const sequence2$ = of('1', '2', '3', 4, '5', '6', '7');
const sequence$ = zip(sequence1$, sequence2$);

sequence$
    .pipe(
        map(([, y]) => {
            // try{
            //     return (y as any).toUpperCase()
            // } catch (e) {
            //     return 'N'
            // }
            return (y as any).toUpperCase()
        }),
        // retryWhen((err)=> err.pipe(delay(1000)))
        // retry(3),
        // catchError((err, obs) => {
        //     console.log('catchError', err);
        //     return of('N')
        // }),
        // tap(()=>{
        //     console.log('AFTER catchError')
        // })
    )
    .subscribe((v) => {
        console.log(v);
    }, (err) => {
        console.log('ERR CB', err)
    }, () => {
        console.log('complete')
    })

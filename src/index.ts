import { fromEvent, interval, of } from "rxjs";
import { concatMap, map, mergeAll, mergeMap, switchMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

const inputRef = document.querySelector('input') as HTMLInputElement;
const source$ = fromEvent(inputRef, 'input')
    .pipe(
        switchMap((v) => {
            return ajax('http://learn.javascript.ru/courses/groups/api/participants?key=1glj803');
        })
        // mergeMap = map + mergeAll;
        // mergeMap = map + concatAll;
        // switchMap = map + switchAll;
    );

source$.subscribe((v) => {
    console.log(v);
})

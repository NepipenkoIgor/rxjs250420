// https://api.github.com/search/repositories?q=

import { EMPTY, fromEvent } from "rxjs";
import {
    bufferCount, catchError,
    concatAll,
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    pluck, reduce,
    switchMap
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";

const inputRef = document.querySelector('#search') as HTMLInputElement;

export interface IResult {
    name: string,
    description: string,
    owner: {
        avatar_url: string
    }
}

export const search$ = fromEvent<any>(inputRef, 'input')
    .pipe(
        debounceTime(300),
        pluck('target', 'value'),
        filter((text: string) => text.trim().length > 3),
        distinctUntilChanged(),
        switchMap((text: string) => {
            return ajax(`https://api.github.com/search/repositories?q=${text}`)
                .pipe(
                    pluck('response', 'items'),  // [IResult, IResult]
                    concatAll(),   // IResult, IResult ,  IResult
                    map((item: any) => createCard(item)),  // htmlCard, htmlCard, htmlCard
                    bufferCount(3), // [htmlCard, htmlCard, htmlCard], [htmlCard, htmlCard,htmlCard]
                    reduce((resultStr, htmlStrings: string[])=> {
                        return resultStr += createRow(htmlStrings)
                    }, ''),
                    map((htmlString: string)=> htmlString.trim()
                        .replace(/\s+(<)/g, '<')),
                    catchError((err) => {
                        // console.log(err);
                        return EMPTY //of('N')
                    })
                )
        }),

    )

function createCard({name, description, owner: {avatar_url}}: IResult) {
    return `
     <div class="col-md-4">
        <div class="card">
           <img src=${avatar_url}>
           <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">${description}</p>
           </div>  
        </div>
     </div>
  `
}

function createRow(htmlStrings: string[]) {
    return `<div class="row">${htmlStrings.join(' ')}</div>`
}

// 1 , 12, 123, 1234  last 1234
// 4 - 5 - 6
// 1s - 4s

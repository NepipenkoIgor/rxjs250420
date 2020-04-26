import { Observable, timer } from "rxjs";
import { ajax } from "rxjs/ajax";
import { concatAll, map, pluck, shareReplay, switchMap, toArray } from "rxjs/operators";

class UserService {
    private uniqueNameSequence$!: Observable<any>;

    public getNames() {
        if (!this.uniqueNameSequence$) {
            this.uniqueNameSequence$ = timer(0, 16000)
                .pipe(
                    switchMap(()=>{
                        return  ajax('http://learn.javascript.ru/courses/groups/api/participants?key=1glj803')
                            .pipe(
                                pluck('response'),
                                concatAll(),
                                map((user: any) => user.profileName),
                                toArray(),
                            )
                    }),
                    shareReplay()
                )
        }
        // if (!this.uniqueNameSequence$) {
        //     this.uniqueNameSequence$ = ajax('http://learn.javascript.ru/courses/groups/api/participants?key=1glj803')
        //         .pipe(
        //             pluck('response'),
        //             concatAll(),
        //             map((user: any) => user.profileName),
        //             toArray(),
        //             shareReplay()
        //         )
        // }
        return this.uniqueNameSequence$;
    }
}

export const userService = new UserService();

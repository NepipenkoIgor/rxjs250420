import { combineLatest, EMPTY, fromEvent, Observable, of } from "rxjs";
import { userService } from "./user.service";
import { debounceTime, map, pluck, switchMap, withLatestFrom } from "rxjs/operators";


export class Form {
    public valueSequence$: Observable<any>;
    private inputRef: HTMLInputElement;
    private saveButton: HTMLButtonElement;


    public constructor(
        public formContainer: HTMLFormElement
    ) {
        this.inputRef = this.formContainer.querySelector('input') as HTMLInputElement;
        this.saveButton = this.formContainer.querySelector('button') as HTMLButtonElement;

        this.valueSequence$ = combineLatest([
            fromEvent(this.inputRef, 'input')
                .pipe(pluck('target', 'value')),
            userService.getNames()
        ])
            .pipe(
                debounceTime(300),
                switchMap(([value, names]: any) => {
                    const isNotValid = names.find((name: any) => name === value)
                    if (isNotValid) {
                        this.inputRef.classList.add('error');
                        this.saveButton.disabled = true;
                        return EMPTY;
                    }
                    this.inputRef.classList.remove('error');
                    this.saveButton.disabled = false;
                    return of(value)
                })
            )

        fromEvent(this.saveButton, 'click')
            .pipe(
                withLatestFrom(this.valueSequence$),
                pluck(1)
            )
            .subscribe((v) => {
                console.log('Can save value', v)
            })
    }
}

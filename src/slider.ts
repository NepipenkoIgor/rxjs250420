import { combineLatest, fromEvent, Observable } from "rxjs";
import { map, pluck, startWith, tap, withLatestFrom } from "rxjs/operators";

const quality$ = getValue(fromEvent($('#quality').slider(), 'change'), redrawSlider);
const rating$ = getValue(fromEvent($('#rating').slider(), 'change'), redrawSlider);
const actual$ = getValue(fromEvent($('#actual').slider(), 'change'), redrawSlider);

export function submitSlider(source$: Observable<any>) {
    return source$
        .pipe(
            withLatestFrom(slider(quality$, rating$, actual$)),
            pluck(1)
        )
}

function slider(
    source1$: Observable<number>,
    source2$: Observable<number>,
    source3$: Observable<number>,
) {
    return combineLatest([source1$, source2$, source3$]).pipe(
        map(([quality, rating, actual]: number[]) => {
            return Math.round((quality + rating + actual) / 3 * 10)
        })
    );
}

function getValue(source$: Observable<any>, sideCb: (param: any) => any): Observable<number> {
    return source$.pipe(
        map(({delegateTarget: {previousElementSibling: element}, value: {newValue}}: any) => {
            return {
                value: newValue,
                element
            }
        }),
        tap(sideCb),
        pluck('value'),
        startWith(5)
    )
}

function redrawSlider({element, value}: any) {
    const sliderTrack = element.querySelector('.slider-track');
    const percentage = value * 10;
    sliderTrack.classList.remove('bad', 'warn', 'good')
    if (percentage < 40) {
        sliderTrack.classList.add('bad');
        return
    }
    if (percentage >= 40 && percentage < 70) {
        sliderTrack.classList.add('warn');
        return
    }
    sliderTrack.classList.add('good');
}

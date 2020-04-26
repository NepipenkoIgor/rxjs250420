import { fromEvent, iif, merge, Observable, of, zip } from "rxjs";
import { map, pluck, switchMap } from "rxjs/operators";

const startTouch$ = getX(
    fromEvent<TouchEvent>(document, 'touchstart'),
    fromEvent<MouseEvent>(document, 'mousedown'),
)
const endTouch$ = getX(
    fromEvent<TouchEvent>(document, 'touchend'),
    fromEvent<MouseEvent>(document, 'mouseup'),
)

export function getX(
    source1$: Observable<TouchEvent>,
    source2$: Observable<MouseEvent | TouchEvent>,
) {
    return merge(source1$, source2$)
        .pipe(
            switchMap((event: TouchEvent | MouseEvent) => {
                    return iif(
                        () => event instanceof TouchEvent,
                        of(event as TouchEvent).pipe(pluck('changedTouches', 0, 'clientX')),
                        of(event as MouseEvent).pipe(pluck('clientX')),
                    )
                }
            )
            // map((event: TouchEvent | MouseEvent) => {
            //     if (event instanceof TouchEvent) {
            //         return event.changedTouches[0].clientX;
            //     }
            //     return event.clientX;
            // })
        )
}

export function swipe(source1$: Observable<number>, source2$: Observable<number>) {
    return zip(source1$, source2$)
        .pipe(
            map(([x1, x2]) => x2 - x1)
        )
}


export const swipe$ = swipe(startTouch$, endTouch$);

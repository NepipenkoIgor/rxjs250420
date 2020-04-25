import { fromEvent, Observable } from "rxjs";
import { concatMap, map, takeUntil, tap } from "rxjs/operators";

const box = document.querySelector('.draggable') as HTMLDivElement;
const mousedown$ = fromEvent<MouseEvent>(box, 'mousedown');
const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup');


function drag(
    source1$: Observable<MouseEvent>,
    source2$: Observable<MouseEvent>,
    source3$: Observable<MouseEvent>,
) {
    return source1$.pipe(
        concatMap((start) => {
            console.log('Start')
            return source2$.pipe(
                map((move) => {
                    move.preventDefault();
                    console.log(move.clientX - start.clientX, move.clientY - start.clientY)
                    return {
                        left: move.clientX - start.clientX,
                        top: move.clientY - start.clientY,
                    }
                }),
                tap(({top, left}) => {
                    box.style.top = `${top}px`;
                    box.style.left = `${left}px`;
                }),
                takeUntil(source3$)
            )
        })
    )
}


export const dragElement$ = drag(mousedown$, mousemove$, mouseup$);

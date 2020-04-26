import { delay, skipLimit, sum } from "./example";
import { TestScheduler } from "rxjs/testing";
import { map } from "rxjs/operators";
import { getX } from "./swipe";


function createTouchEvent(clientX: number) {
    return new TouchEvent('event', {
        changedTouches: [new Touch({clientX, identifier: 1, target: new EventTarget()})]
    })
}

describe('Test swipe', () => {
    let testScheduler: TestScheduler;
    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        })
    });
    it('getX should transform right', () => {
        testScheduler.run(({hot, expectObservable}) => {
            const touch1$ = hot('-a--b----c--|', {
                a: createTouchEvent(10),
                b: createTouchEvent(20),
                c: createTouchEvent(1)
            })
            const touch2$ = hot('------e-----|', {
                e: createTouchEvent(333)
            })

            const sequence = '-a--b-e--c--|';

            expectObservable(
                getX(touch1$, touch2$)
            ).toBe(sequence, {
                a: 10,
                b: 20,
                c: 1,
                e: 333
            })
        })
    });
})

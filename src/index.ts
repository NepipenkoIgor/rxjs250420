import { swipe$ } from './swipe';

swipe$
    .subscribe((direction) => {

        if(direction > 0) {
            console.log('Swipe right');
            return;
        }
        console.log('Swipe left');
    })

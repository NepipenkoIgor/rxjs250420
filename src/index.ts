import { interval } from "rxjs";
import { skipLimit } from "./skip-limit";


interval(1000)
    .pipe(skipLimit(4, 3))
    .subscribe((v) => {
        console.log(v)
    })

import { submitSlider } from "./slider";
import { fromEvent } from "rxjs";

const resultBtn = document.querySelector('#send-result') as HTMLButtonElement;
submitSlider(fromEvent(resultBtn, 'click'))
    .subscribe((value) => {
        console.log(value)
    })

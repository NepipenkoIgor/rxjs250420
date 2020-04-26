import { Form } from "./form";

const form1 = document.querySelector('.first-form') as HTMLFormElement;
const form2 = document.querySelector('.second-form') as HTMLFormElement;

form2.hidden = true;

new Form(form1);

setTimeout(()=>{
    form2.hidden = false;
    new Form(form2);
}, 5000)

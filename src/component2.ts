import { service } from "./service";


setTimeout(() => {
    service.getData().subscribe((v) => {
        console.log('Component 2', v)
    })
}, 5000)

import { ReplaySubject, Subject } from "rxjs";

class Service {
    private controlSequence$$ = new ReplaySubject()

    getData() {
        return this.controlSequence$$.asObservable();
    }

    setDate(data: any) {
        this.controlSequence$$.next(data)
    }
}

export const service =  new Service();

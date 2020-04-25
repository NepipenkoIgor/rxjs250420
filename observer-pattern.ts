//rxjs = ReactiveX на JS
//ReactiveX = Observer + Iterator + functional programming
interface IListener {
    next: (message: string) => void
}

class Producer {
    private listeners: IListener[] = [];

    public subscribe(listener: IListener) {
        const index = this.listeners.push(listener);
        return {
            unsubscribe: () => {
                this.listeners.splice(index - 1, 1)
            }
        }
    }

    public notify(message: string) {
        this.listeners.forEach((listener: IListener) => {
            listener.next(message);
        })
    }
}

const listener1: IListener = {
    next: (message: string) => {
          console.log('Listener 1 received', message);
    }
}
const listener2: IListener = {
    next: (message: string) => {
        console.log('Listener 2 received', message);
    }
}

const notifier = new Producer();

const subscription1 = notifier.subscribe(listener1);
const subscription2 = notifier.subscribe(listener2);

notifier.notify('Hello there !!!');
subscription1.unsubscribe();


setTimeout(()=>{
    notifier.notify('Hello without first!!!');
}, 5000)






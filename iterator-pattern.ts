class CustomIterator {
    private cursor: number = 0;
    private value!: number;

    constructor(
        private arr: number[], private divisor: number
    ) {
    }

    next(): { value: number, done: boolean } {
        while (this.cursor < this.arr.length) {
            this.value = this.arr[this.cursor++];
            if (this.value % this.divisor === 0) {
                return {done: false, value: this.value}
            }
        }
        return {done: true, value: this.value}
    }

    [Symbol.iterator]() {
        return {
            next: this.next.bind(this)
        }
    }
}

const consumer = new CustomIterator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2);

// console.log(consumer.next());
// console.log(consumer.next());
// console.log(consumer.next());
// console.log(consumer.next());
// console.log(consumer.next());
// console.log(consumer.next());


// for (let item of consumer) {
//     console.log(item);
// }

const v = Array.from(consumer)
    .reduce((acc, next) => {
        return acc += next;
    }, 0);

console.log(v);

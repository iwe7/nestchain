"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iterator_1 = require("../symbol/iterator");
exports.subscribeToIterable = (iterable) => (subscriber) => {
    const iterator = iterable[iterator_1.iterator]();
    do {
        const item = iterator.next();
        if (item.done) {
            subscriber.complete();
            break;
        }
        subscriber.next(item.value);
        if (subscriber.closed) {
            break;
        }
    } while (true);
    if (typeof iterator.return === 'function') {
        subscriber.add(() => {
            if (iterator.return) {
                iterator.return();
            }
        });
    }
    return subscriber;
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("../Observable");
const Subscription_1 = require("../Subscription");
const iterator_1 = require("../symbol/iterator");
const subscribeToIterable_1 = require("../util/subscribeToIterable");
function fromIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    if (!scheduler) {
        return new Observable_1.Observable(subscribeToIterable_1.subscribeToIterable(input));
    }
    else {
        return new Observable_1.Observable(subscriber => {
            const sub = new Subscription_1.Subscription();
            let iterator;
            sub.add(() => {
                if (iterator && typeof iterator.return === 'function') {
                    iterator.return();
                }
            });
            sub.add(scheduler.schedule(() => {
                iterator = input[iterator_1.iterator]();
                sub.add(scheduler.schedule(function () {
                    if (subscriber.closed) {
                        return;
                    }
                    let value;
                    let done;
                    try {
                        const result = iterator.next();
                        value = result.value;
                        done = result.done;
                    }
                    catch (err) {
                        subscriber.error(err);
                        return;
                    }
                    if (done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(value);
                        this.schedule();
                    }
                }));
            }));
            return sub;
        });
    }
}
exports.fromIterable = fromIterable;

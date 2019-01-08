"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("../Observable");
const Subscription_1 = require("../Subscription");
const observable_1 = require("../symbol/observable");
const subscribeToObservable_1 = require("../util/subscribeToObservable");
function fromObservable(input, scheduler) {
    if (!scheduler) {
        return new Observable_1.Observable(subscribeToObservable_1.subscribeToObservable(input));
    }
    else {
        return new Observable_1.Observable(subscriber => {
            const sub = new Subscription_1.Subscription();
            sub.add(scheduler.schedule(() => {
                const observable = input[observable_1.observable]();
                sub.add(observable.subscribe({
                    next(value) { sub.add(scheduler.schedule(() => subscriber.next(value))); },
                    error(err) { sub.add(scheduler.schedule(() => subscriber.error(err))); },
                    complete() { sub.add(scheduler.schedule(() => subscriber.complete())); },
                }));
            }));
            return sub;
        });
    }
}
exports.fromObservable = fromObservable;

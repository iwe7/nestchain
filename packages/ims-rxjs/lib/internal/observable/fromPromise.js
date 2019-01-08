"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("../Observable");
const Subscription_1 = require("../Subscription");
const subscribeToPromise_1 = require("../util/subscribeToPromise");
function fromPromise(input, scheduler) {
    if (!scheduler) {
        return new Observable_1.Observable(subscribeToPromise_1.subscribeToPromise(input));
    }
    else {
        return new Observable_1.Observable(subscriber => {
            const sub = new Subscription_1.Subscription();
            sub.add(scheduler.schedule(() => input.then(value => {
                sub.add(scheduler.schedule(() => {
                    subscriber.next(value);
                    sub.add(scheduler.schedule(() => subscriber.complete()));
                }));
            }, err => {
                sub.add(scheduler.schedule(() => subscriber.error(err)));
            })));
            return sub;
        });
    }
}
exports.fromPromise = fromPromise;

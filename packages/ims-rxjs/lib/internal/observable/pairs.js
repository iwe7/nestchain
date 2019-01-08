"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("../Observable");
const Subscription_1 = require("../Subscription");
function pairs(obj, scheduler) {
    if (!scheduler) {
        return new Observable_1.Observable(subscriber => {
            const keys = Object.keys(obj);
            for (let i = 0; i < keys.length && !subscriber.closed; i++) {
                const key = keys[i];
                if (obj.hasOwnProperty(key)) {
                    subscriber.next([key, obj[key]]);
                }
            }
            subscriber.complete();
        });
    }
    else {
        return new Observable_1.Observable(subscriber => {
            const keys = Object.keys(obj);
            const subscription = new Subscription_1.Subscription();
            subscription.add(scheduler.schedule(dispatch, 0, { keys, index: 0, subscriber, subscription, obj }));
            return subscription;
        });
    }
}
exports.pairs = pairs;
function dispatch(state) {
    const { keys, index, subscriber, subscription, obj } = state;
    if (!subscriber.closed) {
        if (index < keys.length) {
            const key = keys[index];
            subscriber.next([key, obj[key]]);
            subscription.add(this.schedule({ keys, index: index + 1, subscriber, subscription, obj }));
        }
        else {
            subscriber.complete();
        }
    }
}
exports.dispatch = dispatch;

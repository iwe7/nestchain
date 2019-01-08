"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("../Observable");
const async_1 = require("../scheduler/async");
const isNumeric_1 = require("../util/isNumeric");
function interval(period = 0, scheduler = async_1.async) {
    if (!isNumeric_1.isNumeric(period) || period < 0) {
        period = 0;
    }
    if (!scheduler || typeof scheduler.schedule !== 'function') {
        scheduler = async_1.async;
    }
    return new Observable_1.Observable(subscriber => {
        subscriber.add(scheduler.schedule(dispatch, period, { subscriber, counter: 0, period }));
        return subscriber;
    });
}
exports.interval = interval;
function dispatch(state) {
    const { subscriber, counter, period } = state;
    subscriber.next(counter);
    this.schedule({ subscriber, counter: counter + 1, period }, period);
}

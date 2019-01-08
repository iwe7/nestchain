"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SubscribeOnObservable_1 = require("../observable/SubscribeOnObservable");
function subscribeOn(scheduler, delay = 0) {
    return function subscribeOnOperatorFunction(source) {
        return source.lift(new SubscribeOnOperator(scheduler, delay));
    };
}
exports.subscribeOn = subscribeOn;
class SubscribeOnOperator {
    constructor(scheduler, delay) {
        this.scheduler = scheduler;
        this.delay = delay;
    }
    call(subscriber, source) {
        return new SubscribeOnObservable_1.SubscribeOnObservable(source, this.delay, this.scheduler).subscribe(subscriber);
    }
}

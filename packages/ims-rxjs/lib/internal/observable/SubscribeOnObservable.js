"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("../Observable");
const asap_1 = require("../scheduler/asap");
const isNumeric_1 = require("../util/isNumeric");
class SubscribeOnObservable extends Observable_1.Observable {
    constructor(source, delayTime = 0, scheduler = asap_1.asap) {
        super();
        this.source = source;
        this.delayTime = delayTime;
        this.scheduler = scheduler;
        if (!isNumeric_1.isNumeric(delayTime) || delayTime < 0) {
            this.delayTime = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            this.scheduler = asap_1.asap;
        }
    }
    static create(source, delay = 0, scheduler = asap_1.asap) {
        return new SubscribeOnObservable(source, delay, scheduler);
    }
    static dispatch(arg) {
        const { source, subscriber } = arg;
        return this.add(source.subscribe(subscriber));
    }
    _subscribe(subscriber) {
        const delay = this.delayTime;
        const source = this.source;
        const scheduler = this.scheduler;
        return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
            source, subscriber
        });
    }
}
exports.SubscribeOnObservable = SubscribeOnObservable;

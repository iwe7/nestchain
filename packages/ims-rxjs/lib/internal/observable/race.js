"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isArray_1 = require("../util/isArray");
const fromArray_1 = require("./fromArray");
const OuterSubscriber_1 = require("../OuterSubscriber");
const subscribeToResult_1 = require("../util/subscribeToResult");
function race(...observables) {
    if (observables.length === 1) {
        if (isArray_1.isArray(observables[0])) {
            observables = observables[0];
        }
        else {
            return observables[0];
        }
    }
    return fromArray_1.fromArray(observables, undefined).lift(new RaceOperator());
}
exports.race = race;
class RaceOperator {
    call(subscriber, source) {
        return source.subscribe(new RaceSubscriber(subscriber));
    }
}
exports.RaceOperator = RaceOperator;
class RaceSubscriber extends OuterSubscriber_1.OuterSubscriber {
    constructor(destination) {
        super(destination);
        this.hasFirst = false;
        this.observables = [];
        this.subscriptions = [];
    }
    _next(observable) {
        this.observables.push(observable);
    }
    _complete() {
        const observables = this.observables;
        const len = observables.length;
        if (len === 0) {
            this.destination.complete();
        }
        else {
            for (let i = 0; i < len && !this.hasFirst; i++) {
                let observable = observables[i];
                let subscription = subscribeToResult_1.subscribeToResult(this, observable, observable, i);
                if (this.subscriptions) {
                    this.subscriptions.push(subscription);
                }
                this.add(subscription);
            }
            this.observables = null;
        }
    }
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (!this.hasFirst) {
            this.hasFirst = true;
            for (let i = 0; i < this.subscriptions.length; i++) {
                if (i !== outerIndex) {
                    let subscription = this.subscriptions[i];
                    subscription.unsubscribe();
                    this.remove(subscription);
                }
            }
            this.subscriptions = null;
        }
        this.destination.next(innerValue);
    }
}
exports.RaceSubscriber = RaceSubscriber;

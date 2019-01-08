"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OuterSubscriber_1 = require("../OuterSubscriber");
const subscribeToResult_1 = require("../util/subscribeToResult");
function debounce(durationSelector) {
    return (source) => source.lift(new DebounceOperator(durationSelector));
}
exports.debounce = debounce;
class DebounceOperator {
    constructor(durationSelector) {
        this.durationSelector = durationSelector;
    }
    call(subscriber, source) {
        return source.subscribe(new DebounceSubscriber(subscriber, this.durationSelector));
    }
}
class DebounceSubscriber extends OuterSubscriber_1.OuterSubscriber {
    constructor(destination, durationSelector) {
        super(destination);
        this.durationSelector = durationSelector;
        this.hasValue = false;
        this.durationSubscription = null;
    }
    _next(value) {
        try {
            const result = this.durationSelector.call(this, value);
            if (result) {
                this._tryNext(value, result);
            }
        }
        catch (err) {
            this.destination.error(err);
        }
    }
    _complete() {
        this.emitValue();
        this.destination.complete();
    }
    _tryNext(value, duration) {
        let subscription = this.durationSubscription;
        this.value = value;
        this.hasValue = true;
        if (subscription) {
            subscription.unsubscribe();
            this.remove(subscription);
        }
        subscription = subscribeToResult_1.subscribeToResult(this, duration);
        if (subscription && !subscription.closed) {
            this.add(this.durationSubscription = subscription);
        }
    }
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.emitValue();
    }
    notifyComplete() {
        this.emitValue();
    }
    emitValue() {
        if (this.hasValue) {
            const value = this.value;
            const subscription = this.durationSubscription;
            if (subscription) {
                this.durationSubscription = null;
                subscription.unsubscribe();
                this.remove(subscription);
            }
            this.value = null;
            this.hasValue = false;
            super._next(value);
        }
    }
}

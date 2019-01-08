"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subscriber_1 = require("../Subscriber");
const Observable_1 = require("../Observable");
const OuterSubscriber_1 = require("../OuterSubscriber");
const subscribeToResult_1 = require("../util/subscribeToResult");
function delayWhen(delayDurationSelector, subscriptionDelay) {
    if (subscriptionDelay) {
        return (source) => new SubscriptionDelayObservable(source, subscriptionDelay)
            .lift(new DelayWhenOperator(delayDurationSelector));
    }
    return (source) => source.lift(new DelayWhenOperator(delayDurationSelector));
}
exports.delayWhen = delayWhen;
class DelayWhenOperator {
    constructor(delayDurationSelector) {
        this.delayDurationSelector = delayDurationSelector;
    }
    call(subscriber, source) {
        return source.subscribe(new DelayWhenSubscriber(subscriber, this.delayDurationSelector));
    }
}
class DelayWhenSubscriber extends OuterSubscriber_1.OuterSubscriber {
    constructor(destination, delayDurationSelector) {
        super(destination);
        this.delayDurationSelector = delayDurationSelector;
        this.completed = false;
        this.delayNotifierSubscriptions = [];
        this.index = 0;
    }
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(outerValue);
        this.removeSubscription(innerSub);
        this.tryComplete();
    }
    notifyError(error, innerSub) {
        this._error(error);
    }
    notifyComplete(innerSub) {
        const value = this.removeSubscription(innerSub);
        if (value) {
            this.destination.next(value);
        }
        this.tryComplete();
    }
    _next(value) {
        const index = this.index++;
        try {
            const delayNotifier = this.delayDurationSelector(value, index);
            if (delayNotifier) {
                this.tryDelay(delayNotifier, value);
            }
        }
        catch (err) {
            this.destination.error(err);
        }
    }
    _complete() {
        this.completed = true;
        this.tryComplete();
        this.unsubscribe();
    }
    removeSubscription(subscription) {
        subscription.unsubscribe();
        const subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);
        if (subscriptionIdx !== -1) {
            this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
        }
        return subscription.outerValue;
    }
    tryDelay(delayNotifier, value) {
        const notifierSubscription = subscribeToResult_1.subscribeToResult(this, delayNotifier, value);
        if (notifierSubscription && !notifierSubscription.closed) {
            const destination = this.destination;
            destination.add(notifierSubscription);
            this.delayNotifierSubscriptions.push(notifierSubscription);
        }
    }
    tryComplete() {
        if (this.completed && this.delayNotifierSubscriptions.length === 0) {
            this.destination.complete();
        }
    }
}
class SubscriptionDelayObservable extends Observable_1.Observable {
    constructor(source, subscriptionDelay) {
        super();
        this.source = source;
        this.subscriptionDelay = subscriptionDelay;
    }
    _subscribe(subscriber) {
        this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
    }
}
class SubscriptionDelaySubscriber extends Subscriber_1.Subscriber {
    constructor(parent, source) {
        super();
        this.parent = parent;
        this.source = source;
        this.sourceSubscribed = false;
    }
    _next(unused) {
        this.subscribeToSource();
    }
    _error(err) {
        this.unsubscribe();
        this.parent.error(err);
    }
    _complete() {
        this.unsubscribe();
        this.subscribeToSource();
    }
    subscribeToSource() {
        if (!this.sourceSubscribed) {
            this.sourceSubscribed = true;
            this.unsubscribe();
            this.source.subscribe(this.parent);
        }
    }
}

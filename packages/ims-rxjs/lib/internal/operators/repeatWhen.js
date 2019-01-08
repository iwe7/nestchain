"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subject_1 = require("../Subject");
const tryCatch_1 = require("../util/tryCatch");
const errorObject_1 = require("../util/errorObject");
const OuterSubscriber_1 = require("../OuterSubscriber");
const subscribeToResult_1 = require("../util/subscribeToResult");
function repeatWhen(notifier) {
    return (source) => source.lift(new RepeatWhenOperator(notifier));
}
exports.repeatWhen = repeatWhen;
class RepeatWhenOperator {
    constructor(notifier) {
        this.notifier = notifier;
    }
    call(subscriber, source) {
        return source.subscribe(new RepeatWhenSubscriber(subscriber, this.notifier, source));
    }
}
class RepeatWhenSubscriber extends OuterSubscriber_1.OuterSubscriber {
    constructor(destination, notifier, source) {
        super(destination);
        this.notifier = notifier;
        this.source = source;
        this.sourceIsBeingSubscribedTo = true;
    }
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.sourceIsBeingSubscribedTo = true;
        this.source.subscribe(this);
    }
    notifyComplete(innerSub) {
        if (this.sourceIsBeingSubscribedTo === false) {
            return super.complete();
        }
    }
    complete() {
        this.sourceIsBeingSubscribedTo = false;
        if (!this.isStopped) {
            if (!this.retries) {
                this.subscribeToRetries();
            }
            if (!this.retriesSubscription || this.retriesSubscription.closed) {
                return super.complete();
            }
            this._unsubscribeAndRecycle();
            this.notifications.next();
        }
    }
    _unsubscribe() {
        const { notifications, retriesSubscription } = this;
        if (notifications) {
            notifications.unsubscribe();
            this.notifications = null;
        }
        if (retriesSubscription) {
            retriesSubscription.unsubscribe();
            this.retriesSubscription = null;
        }
        this.retries = null;
    }
    _unsubscribeAndRecycle() {
        const { _unsubscribe } = this;
        this._unsubscribe = null;
        super._unsubscribeAndRecycle();
        this._unsubscribe = _unsubscribe;
        return this;
    }
    subscribeToRetries() {
        this.notifications = new Subject_1.Subject();
        const retries = tryCatch_1.tryCatch(this.notifier)(this.notifications);
        if (retries === errorObject_1.errorObject) {
            return super.complete();
        }
        this.retries = retries;
        this.retriesSubscription = subscribeToResult_1.subscribeToResult(this, retries);
    }
}

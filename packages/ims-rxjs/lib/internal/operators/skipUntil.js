"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OuterSubscriber_1 = require("../OuterSubscriber");
const InnerSubscriber_1 = require("../InnerSubscriber");
const subscribeToResult_1 = require("../util/subscribeToResult");
function skipUntil(notifier) {
    return (source) => source.lift(new SkipUntilOperator(notifier));
}
exports.skipUntil = skipUntil;
class SkipUntilOperator {
    constructor(notifier) {
        this.notifier = notifier;
    }
    call(destination, source) {
        return source.subscribe(new SkipUntilSubscriber(destination, this.notifier));
    }
}
class SkipUntilSubscriber extends OuterSubscriber_1.OuterSubscriber {
    constructor(destination, notifier) {
        super(destination);
        this.hasValue = false;
        const innerSubscriber = new InnerSubscriber_1.InnerSubscriber(this, undefined, undefined);
        this.add(innerSubscriber);
        this.innerSubscription = innerSubscriber;
        subscribeToResult_1.subscribeToResult(this, notifier, undefined, undefined, innerSubscriber);
    }
    _next(value) {
        if (this.hasValue) {
            super._next(value);
        }
    }
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.hasValue = true;
        if (this.innerSubscription) {
            this.innerSubscription.unsubscribe();
        }
    }
    notifyComplete() {
    }
}

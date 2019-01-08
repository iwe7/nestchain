"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OuterSubscriber_1 = require("../OuterSubscriber");
const subscribeToResult_1 = require("../util/subscribeToResult");
function sample(notifier) {
    return (source) => source.lift(new SampleOperator(notifier));
}
exports.sample = sample;
class SampleOperator {
    constructor(notifier) {
        this.notifier = notifier;
    }
    call(subscriber, source) {
        const sampleSubscriber = new SampleSubscriber(subscriber);
        const subscription = source.subscribe(sampleSubscriber);
        subscription.add(subscribeToResult_1.subscribeToResult(sampleSubscriber, this.notifier));
        return subscription;
    }
}
class SampleSubscriber extends OuterSubscriber_1.OuterSubscriber {
    constructor() {
        super(...arguments);
        this.hasValue = false;
    }
    _next(value) {
        this.value = value;
        this.hasValue = true;
    }
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.emitValue();
    }
    notifyComplete() {
        this.emitValue();
    }
    emitValue() {
        if (this.hasValue) {
            this.hasValue = false;
            this.destination.next(this.value);
        }
    }
}

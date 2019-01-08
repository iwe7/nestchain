"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OuterSubscriber_1 = require("../OuterSubscriber");
const subscribeToResult_1 = require("../util/subscribeToResult");
function exhaust() {
    return (source) => source.lift(new SwitchFirstOperator());
}
exports.exhaust = exhaust;
class SwitchFirstOperator {
    call(subscriber, source) {
        return source.subscribe(new SwitchFirstSubscriber(subscriber));
    }
}
class SwitchFirstSubscriber extends OuterSubscriber_1.OuterSubscriber {
    constructor(destination) {
        super(destination);
        this.hasCompleted = false;
        this.hasSubscription = false;
    }
    _next(value) {
        if (!this.hasSubscription) {
            this.hasSubscription = true;
            this.add(subscribeToResult_1.subscribeToResult(this, value));
        }
    }
    _complete() {
        this.hasCompleted = true;
        if (!this.hasSubscription) {
            this.destination.complete();
        }
    }
    notifyComplete(innerSub) {
        this.remove(innerSub);
        this.hasSubscription = false;
        if (this.hasCompleted) {
            this.destination.complete();
        }
    }
}

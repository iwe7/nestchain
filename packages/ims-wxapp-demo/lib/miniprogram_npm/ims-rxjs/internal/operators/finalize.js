"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subscriber_1 = require("../Subscriber");
const Subscription_1 = require("../Subscription");
function finalize(callback) {
    return (source) => source.lift(new FinallyOperator(callback));
}
exports.finalize = finalize;
class FinallyOperator {
    constructor(callback) {
        this.callback = callback;
    }
    call(subscriber, source) {
        return source.subscribe(new FinallySubscriber(subscriber, this.callback));
    }
}
class FinallySubscriber extends Subscriber_1.Subscriber {
    constructor(destination, callback) {
        super(destination);
        this.add(new Subscription_1.Subscription(callback));
    }
}

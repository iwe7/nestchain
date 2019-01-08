"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subscriber_1 = require("./Subscriber");
class OuterSubscriber extends Subscriber_1.Subscriber {
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    }
    notifyError(error, innerSub) {
        this.destination.error(error);
    }
    notifyComplete(innerSub) {
        this.destination.complete();
    }
}
exports.OuterSubscriber = OuterSubscriber;

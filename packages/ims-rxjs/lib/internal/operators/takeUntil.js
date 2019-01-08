"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OuterSubscriber_1 = require("../OuterSubscriber");
const subscribeToResult_1 = require("../util/subscribeToResult");
function takeUntil(notifier) {
    return (source) => source.lift(new TakeUntilOperator(notifier));
}
exports.takeUntil = takeUntil;
class TakeUntilOperator {
    constructor(notifier) {
        this.notifier = notifier;
    }
    call(subscriber, source) {
        const takeUntilSubscriber = new TakeUntilSubscriber(subscriber);
        const notifierSubscription = subscribeToResult_1.subscribeToResult(takeUntilSubscriber, this.notifier);
        if (notifierSubscription && !takeUntilSubscriber.seenValue) {
            takeUntilSubscriber.add(notifierSubscription);
            return source.subscribe(takeUntilSubscriber);
        }
        return takeUntilSubscriber;
    }
}
class TakeUntilSubscriber extends OuterSubscriber_1.OuterSubscriber {
    constructor(destination) {
        super(destination);
        this.seenValue = false;
    }
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.seenValue = true;
        this.complete();
    }
    notifyComplete() {
    }
}

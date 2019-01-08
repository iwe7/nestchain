"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subscriber_1 = require("../Subscriber");
function skipWhile(predicate) {
    return (source) => source.lift(new SkipWhileOperator(predicate));
}
exports.skipWhile = skipWhile;
class SkipWhileOperator {
    constructor(predicate) {
        this.predicate = predicate;
    }
    call(subscriber, source) {
        return source.subscribe(new SkipWhileSubscriber(subscriber, this.predicate));
    }
}
class SkipWhileSubscriber extends Subscriber_1.Subscriber {
    constructor(destination, predicate) {
        super(destination);
        this.predicate = predicate;
        this.skipping = true;
        this.index = 0;
    }
    _next(value) {
        const destination = this.destination;
        if (this.skipping) {
            this.tryCallPredicate(value);
        }
        if (!this.skipping) {
            destination.next(value);
        }
    }
    tryCallPredicate(value) {
        try {
            const result = this.predicate(value, this.index++);
            this.skipping = Boolean(result);
        }
        catch (err) {
            this.destination.error(err);
        }
    }
}

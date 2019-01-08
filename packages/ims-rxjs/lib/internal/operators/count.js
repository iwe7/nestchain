"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subscriber_1 = require("../Subscriber");
function count(predicate) {
    return (source) => source.lift(new CountOperator(predicate, source));
}
exports.count = count;
class CountOperator {
    constructor(predicate, source) {
        this.predicate = predicate;
        this.source = source;
    }
    call(subscriber, source) {
        return source.subscribe(new CountSubscriber(subscriber, this.predicate, this.source));
    }
}
class CountSubscriber extends Subscriber_1.Subscriber {
    constructor(destination, predicate, source) {
        super(destination);
        this.predicate = predicate;
        this.source = source;
        this.count = 0;
        this.index = 0;
    }
    _next(value) {
        if (this.predicate) {
            this._tryPredicate(value);
        }
        else {
            this.count++;
        }
    }
    _tryPredicate(value) {
        let result;
        try {
            result = this.predicate(value, this.index++, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.count++;
        }
    }
    _complete() {
        this.destination.next(this.count);
        this.destination.complete();
    }
}

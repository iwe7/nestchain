"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subscriber_1 = require("../Subscriber");
function defaultIfEmpty(defaultValue = null) {
    return (source) => source.lift(new DefaultIfEmptyOperator(defaultValue));
}
exports.defaultIfEmpty = defaultIfEmpty;
class DefaultIfEmptyOperator {
    constructor(defaultValue) {
        this.defaultValue = defaultValue;
    }
    call(subscriber, source) {
        return source.subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
    }
}
class DefaultIfEmptySubscriber extends Subscriber_1.Subscriber {
    constructor(destination, defaultValue) {
        super(destination);
        this.defaultValue = defaultValue;
        this.isEmpty = true;
    }
    _next(value) {
        this.isEmpty = false;
        this.destination.next(value);
    }
    _complete() {
        if (this.isEmpty) {
            this.destination.next(this.defaultValue);
        }
        this.destination.complete();
    }
}

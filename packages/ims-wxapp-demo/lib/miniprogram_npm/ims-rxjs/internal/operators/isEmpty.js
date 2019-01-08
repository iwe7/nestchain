"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subscriber_1 = require("../Subscriber");
function isEmpty() {
    return (source) => source.lift(new IsEmptyOperator());
}
exports.isEmpty = isEmpty;
class IsEmptyOperator {
    call(observer, source) {
        return source.subscribe(new IsEmptySubscriber(observer));
    }
}
class IsEmptySubscriber extends Subscriber_1.Subscriber {
    constructor(destination) {
        super(destination);
    }
    notifyComplete(isEmpty) {
        const destination = this.destination;
        destination.next(isEmpty);
        destination.complete();
    }
    _next(value) {
        this.notifyComplete(false);
    }
    _complete() {
        this.notifyComplete(true);
    }
}

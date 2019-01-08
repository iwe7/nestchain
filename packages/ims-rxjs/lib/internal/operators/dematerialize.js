"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subscriber_1 = require("../Subscriber");
function dematerialize() {
    return function dematerializeOperatorFunction(source) {
        return source.lift(new DeMaterializeOperator());
    };
}
exports.dematerialize = dematerialize;
class DeMaterializeOperator {
    call(subscriber, source) {
        return source.subscribe(new DeMaterializeSubscriber(subscriber));
    }
}
class DeMaterializeSubscriber extends Subscriber_1.Subscriber {
    constructor(destination) {
        super(destination);
    }
    _next(value) {
        value.observe(this.destination);
    }
}

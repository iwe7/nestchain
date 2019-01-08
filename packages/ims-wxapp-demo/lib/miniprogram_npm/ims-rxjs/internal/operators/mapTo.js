"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subscriber_1 = require("../Subscriber");
function mapTo(value) {
    return (source) => source.lift(new MapToOperator(value));
}
exports.mapTo = mapTo;
class MapToOperator {
    constructor(value) {
        this.value = value;
    }
    call(subscriber, source) {
        return source.subscribe(new MapToSubscriber(subscriber, this.value));
    }
}
class MapToSubscriber extends Subscriber_1.Subscriber {
    constructor(destination, value) {
        super(destination);
        this.value = value;
    }
    _next(x) {
        this.destination.next(this.value);
    }
}

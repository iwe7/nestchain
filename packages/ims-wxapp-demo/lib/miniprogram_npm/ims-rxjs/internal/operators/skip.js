"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subscriber_1 = require("../Subscriber");
function skip(count) {
    return (source) => source.lift(new SkipOperator(count));
}
exports.skip = skip;
class SkipOperator {
    constructor(total) {
        this.total = total;
    }
    call(subscriber, source) {
        return source.subscribe(new SkipSubscriber(subscriber, this.total));
    }
}
class SkipSubscriber extends Subscriber_1.Subscriber {
    constructor(destination, total) {
        super(destination);
        this.total = total;
        this.count = 0;
    }
    _next(x) {
        if (++this.count > this.total) {
            this.destination.next(x);
        }
    }
}

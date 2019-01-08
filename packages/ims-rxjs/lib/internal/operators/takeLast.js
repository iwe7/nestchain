"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subscriber_1 = require("../Subscriber");
const ArgumentOutOfRangeError_1 = require("../util/ArgumentOutOfRangeError");
const empty_1 = require("../observable/empty");
function takeLast(count) {
    return function takeLastOperatorFunction(source) {
        if (count === 0) {
            return empty_1.empty();
        }
        else {
            return source.lift(new TakeLastOperator(count));
        }
    };
}
exports.takeLast = takeLast;
class TakeLastOperator {
    constructor(total) {
        this.total = total;
        if (this.total < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
        }
    }
    call(subscriber, source) {
        return source.subscribe(new TakeLastSubscriber(subscriber, this.total));
    }
}
class TakeLastSubscriber extends Subscriber_1.Subscriber {
    constructor(destination, total) {
        super(destination);
        this.total = total;
        this.ring = new Array();
        this.count = 0;
    }
    _next(value) {
        const ring = this.ring;
        const total = this.total;
        const count = this.count++;
        if (ring.length < total) {
            ring.push(value);
        }
        else {
            const index = count % total;
            ring[index] = value;
        }
    }
    _complete() {
        const destination = this.destination;
        let count = this.count;
        if (count > 0) {
            const total = this.count >= this.total ? this.total : this.count;
            const ring = this.ring;
            for (let i = 0; i < total; i++) {
                const idx = (count++) % total;
                destination.next(ring[idx]);
            }
        }
        destination.complete();
    }
}

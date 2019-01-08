"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subscriber_1 = require("../Subscriber");
const ArgumentOutOfRangeError_1 = require("../util/ArgumentOutOfRangeError");
function skipLast(count) {
    return (source) => source.lift(new SkipLastOperator(count));
}
exports.skipLast = skipLast;
class SkipLastOperator {
    constructor(_skipCount) {
        this._skipCount = _skipCount;
        if (this._skipCount < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
        }
    }
    call(subscriber, source) {
        if (this._skipCount === 0) {
            return source.subscribe(new Subscriber_1.Subscriber(subscriber));
        }
        else {
            return source.subscribe(new SkipLastSubscriber(subscriber, this._skipCount));
        }
    }
}
class SkipLastSubscriber extends Subscriber_1.Subscriber {
    constructor(destination, _skipCount) {
        super(destination);
        this._skipCount = _skipCount;
        this._count = 0;
        this._ring = new Array(_skipCount);
    }
    _next(value) {
        const skipCount = this._skipCount;
        const count = this._count++;
        if (count < skipCount) {
            this._ring[count] = value;
        }
        else {
            const currentIndex = count % skipCount;
            const ring = this._ring;
            const oldValue = ring[currentIndex];
            ring[currentIndex] = value;
            this.destination.next(oldValue);
        }
    }
}

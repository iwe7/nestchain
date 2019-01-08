"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subscriber_1 = require("../Subscriber");
const noop_1 = require("../util/noop");
const isFunction_1 = require("../util/isFunction");
function tap(nextOrObserver, error, complete) {
    return function tapOperatorFunction(source) {
        return source.lift(new DoOperator(nextOrObserver, error, complete));
    };
}
exports.tap = tap;
class DoOperator {
    constructor(nextOrObserver, error, complete) {
        this.nextOrObserver = nextOrObserver;
        this.error = error;
        this.complete = complete;
    }
    call(subscriber, source) {
        return source.subscribe(new TapSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
    }
}
class TapSubscriber extends Subscriber_1.Subscriber {
    constructor(destination, observerOrNext, error, complete) {
        super(destination);
        this._tapNext = noop_1.noop;
        this._tapError = noop_1.noop;
        this._tapComplete = noop_1.noop;
        this._tapError = error || noop_1.noop;
        this._tapComplete = complete || noop_1.noop;
        if (isFunction_1.isFunction(observerOrNext)) {
            this._context = this;
            this._tapNext = observerOrNext;
        }
        else if (observerOrNext) {
            this._context = observerOrNext;
            this._tapNext = observerOrNext.next || noop_1.noop;
            this._tapError = observerOrNext.error || noop_1.noop;
            this._tapComplete = observerOrNext.complete || noop_1.noop;
        }
    }
    _next(value) {
        try {
            this._tapNext.call(this._context, value);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(value);
    }
    _error(err) {
        try {
            this._tapError.call(this._context, err);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.error(err);
    }
    _complete() {
        try {
            this._tapComplete.call(this._context);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        return this.destination.complete();
    }
}

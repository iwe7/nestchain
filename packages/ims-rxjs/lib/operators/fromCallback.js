"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
function fromCallback(addHandler, removeHandler, resultSelector) {
    return new FromCallbackObservable(addHandler, removeHandler, resultSelector);
}
exports.fromCallback = fromCallback;
class FromCallbackObservable extends index_1.Observable {
    constructor(addHandler, removeHandler, resultSelector) {
        super();
        this.addHandler = addHandler;
        this.removeHandler = removeHandler;
        this.resultSelector = resultSelector;
    }
    _subscribe(subscriber) {
        return new FromCallbackSubscriber(subscriber, this.addHandler, this.removeHandler, this.resultSelector);
    }
}
exports.FromCallbackObservable = FromCallbackObservable;
class FromCallbackSubscriber extends index_1.Subscriber {
    constructor(destination, addHandler, removeHandler, resultSelector) {
        super(destination);
        this.addHandler = addHandler;
        this.removeHandler = removeHandler;
        this.resultSelector = resultSelector;
        this.fns = {
            next: this.next.bind(this),
            error: this.error.bind(this),
            complete: this.complete.bind(this),
        };
        this.addHandler(this.fns);
    }
    next(d) {
        this.destination.next(d);
    }
    error(e) {
        this.removeHandler && this.removeHandler(this.fns);
        super.error();
    }
    complete() {
        this.removeHandler && this.removeHandler(this.fns);
        super.complete();
    }
    unsubscribe() {
        this.removeHandler && this.removeHandler(this.fns);
        super.unsubscribe();
    }
}
exports.FromCallbackSubscriber = FromCallbackSubscriber;

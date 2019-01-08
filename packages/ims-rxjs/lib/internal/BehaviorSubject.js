"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subject_1 = require("./Subject");
const ObjectUnsubscribedError_1 = require("./util/ObjectUnsubscribedError");
class BehaviorSubject extends Subject_1.Subject {
    constructor(_value) {
        super();
        this._value = _value;
    }
    get value() {
        return this.getValue();
    }
    _subscribe(subscriber) {
        const subscription = super._subscribe(subscriber);
        if (subscription && !subscription.closed) {
            subscriber.next(this._value);
        }
        return subscription;
    }
    getValue() {
        if (this.hasError) {
            throw this.thrownError;
        }
        else if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else {
            return this._value;
        }
    }
    next(value) {
        super.next(this._value = value);
    }
}
exports.BehaviorSubject = BehaviorSubject;

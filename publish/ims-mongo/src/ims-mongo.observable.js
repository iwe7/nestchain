"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
class ImsMongoObservable extends rxjs_1.Observable {
    _subscribe(subscriber) {
        return new ImsMongoSubscriber(subscriber);
    }
}
exports.ImsMongoObservable = ImsMongoObservable;
class ImsMongoSubscriber extends rxjs_1.Subscriber {
    constructor(destination) {
        super(destination);
    }
}
exports.ImsMongoSubscriber = ImsMongoSubscriber;

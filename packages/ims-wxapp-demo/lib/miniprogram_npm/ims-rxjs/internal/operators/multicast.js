"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectableObservable_1 = require("../observable/ConnectableObservable");
function multicast(subjectOrSubjectFactory, selector) {
    return function multicastOperatorFunction(source) {
        let subjectFactory;
        if (typeof subjectOrSubjectFactory === 'function') {
            subjectFactory = subjectOrSubjectFactory;
        }
        else {
            subjectFactory = function subjectFactory() {
                return subjectOrSubjectFactory;
            };
        }
        if (typeof selector === 'function') {
            return source.lift(new MulticastOperator(subjectFactory, selector));
        }
        const connectable = Object.create(source, ConnectableObservable_1.connectableObservableDescriptor);
        connectable.source = source;
        connectable.subjectFactory = subjectFactory;
        return connectable;
    };
}
exports.multicast = multicast;
class MulticastOperator {
    constructor(subjectFactory, selector) {
        this.subjectFactory = subjectFactory;
        this.selector = selector;
    }
    call(subscriber, source) {
        const { selector } = this;
        const subject = this.subjectFactory();
        const subscription = selector(subject).subscribe(subscriber);
        subscription.add(source.subscribe(subject));
        return subscription;
    }
}
exports.MulticastOperator = MulticastOperator;

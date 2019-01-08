"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subscriber_1 = require("../Subscriber");
const Notification_1 = require("../Notification");
function materialize() {
    return function materializeOperatorFunction(source) {
        return source.lift(new MaterializeOperator());
    };
}
exports.materialize = materialize;
class MaterializeOperator {
    call(subscriber, source) {
        return source.subscribe(new MaterializeSubscriber(subscriber));
    }
}
class MaterializeSubscriber extends Subscriber_1.Subscriber {
    constructor(destination) {
        super(destination);
    }
    _next(value) {
        this.destination.next(Notification_1.Notification.createNext(value));
    }
    _error(err) {
        const destination = this.destination;
        destination.next(Notification_1.Notification.createError(err));
        destination.complete();
    }
    _complete() {
        const destination = this.destination;
        destination.next(Notification_1.Notification.createComplete());
        destination.complete();
    }
}

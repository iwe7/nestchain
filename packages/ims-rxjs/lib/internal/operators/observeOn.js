"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subscriber_1 = require("../Subscriber");
const Notification_1 = require("../Notification");
function observeOn(scheduler, delay = 0) {
    return function observeOnOperatorFunction(source) {
        return source.lift(new ObserveOnOperator(scheduler, delay));
    };
}
exports.observeOn = observeOn;
class ObserveOnOperator {
    constructor(scheduler, delay = 0) {
        this.scheduler = scheduler;
        this.delay = delay;
    }
    call(subscriber, source) {
        return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
    }
}
exports.ObserveOnOperator = ObserveOnOperator;
class ObserveOnSubscriber extends Subscriber_1.Subscriber {
    constructor(destination, scheduler, delay = 0) {
        super(destination);
        this.scheduler = scheduler;
        this.delay = delay;
    }
    static dispatch(arg) {
        const { notification, destination } = arg;
        notification.observe(destination);
        this.unsubscribe();
    }
    scheduleMessage(notification) {
        const destination = this.destination;
        destination.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
    }
    _next(value) {
        this.scheduleMessage(Notification_1.Notification.createNext(value));
    }
    _error(err) {
        this.scheduleMessage(Notification_1.Notification.createError(err));
        this.unsubscribe();
    }
    _complete() {
        this.scheduleMessage(Notification_1.Notification.createComplete());
        this.unsubscribe();
    }
}
exports.ObserveOnSubscriber = ObserveOnSubscriber;
class ObserveOnMessage {
    constructor(notification, destination) {
        this.notification = notification;
        this.destination = destination;
    }
}
exports.ObserveOnMessage = ObserveOnMessage;

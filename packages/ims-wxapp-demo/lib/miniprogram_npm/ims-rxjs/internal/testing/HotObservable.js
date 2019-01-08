"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subject_1 = require("../Subject");
const Subscription_1 = require("../Subscription");
const SubscriptionLoggable_1 = require("./SubscriptionLoggable");
const applyMixins_1 = require("../util/applyMixins");
class HotObservable extends Subject_1.Subject {
    constructor(messages, scheduler) {
        super();
        this.messages = messages;
        this.subscriptions = [];
        this.scheduler = scheduler;
    }
    _subscribe(subscriber) {
        const subject = this;
        const index = subject.logSubscribedFrame();
        const subscription = new Subscription_1.Subscription();
        subscription.add(new Subscription_1.Subscription(() => {
            subject.logUnsubscribedFrame(index);
        }));
        subscription.add(super._subscribe(subscriber));
        return subscription;
    }
    setup() {
        const subject = this;
        const messagesLength = subject.messages.length;
        for (var i = 0; i < messagesLength; i++) {
            (() => {
                var message = subject.messages[i];
                subject.scheduler.schedule(() => { message.notification.observe(subject); }, message.frame);
            })();
        }
    }
}
exports.HotObservable = HotObservable;
applyMixins_1.applyMixins(HotObservable, [SubscriptionLoggable_1.SubscriptionLoggable]);

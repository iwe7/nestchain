"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subject_1 = require("../Subject");
const Subscription_1 = require("../Subscription");
const tryCatch_1 = require("../util/tryCatch");
const errorObject_1 = require("../util/errorObject");
const OuterSubscriber_1 = require("../OuterSubscriber");
const subscribeToResult_1 = require("../util/subscribeToResult");
function windowToggle(openings, closingSelector) {
    return (source) => source.lift(new WindowToggleOperator(openings, closingSelector));
}
exports.windowToggle = windowToggle;
class WindowToggleOperator {
    constructor(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
    }
    call(subscriber, source) {
        return source.subscribe(new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector));
    }
}
class WindowToggleSubscriber extends OuterSubscriber_1.OuterSubscriber {
    constructor(destination, openings, closingSelector) {
        super(destination);
        this.openings = openings;
        this.closingSelector = closingSelector;
        this.contexts = [];
        this.add(this.openSubscription = subscribeToResult_1.subscribeToResult(this, openings, openings));
    }
    _next(value) {
        const { contexts } = this;
        if (contexts) {
            const len = contexts.length;
            for (let i = 0; i < len; i++) {
                contexts[i].window.next(value);
            }
        }
    }
    _error(err) {
        const { contexts } = this;
        this.contexts = null;
        if (contexts) {
            const len = contexts.length;
            let index = -1;
            while (++index < len) {
                const context = contexts[index];
                context.window.error(err);
                context.subscription.unsubscribe();
            }
        }
        super._error(err);
    }
    _complete() {
        const { contexts } = this;
        this.contexts = null;
        if (contexts) {
            const len = contexts.length;
            let index = -1;
            while (++index < len) {
                const context = contexts[index];
                context.window.complete();
                context.subscription.unsubscribe();
            }
        }
        super._complete();
    }
    _unsubscribe() {
        const { contexts } = this;
        this.contexts = null;
        if (contexts) {
            const len = contexts.length;
            let index = -1;
            while (++index < len) {
                const context = contexts[index];
                context.window.unsubscribe();
                context.subscription.unsubscribe();
            }
        }
    }
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (outerValue === this.openings) {
            const { closingSelector } = this;
            const closingNotifier = tryCatch_1.tryCatch(closingSelector)(innerValue);
            if (closingNotifier === errorObject_1.errorObject) {
                return this.error(errorObject_1.errorObject.e);
            }
            else {
                const window = new Subject_1.Subject();
                const subscription = new Subscription_1.Subscription();
                const context = { window, subscription };
                this.contexts.push(context);
                const innerSubscription = subscribeToResult_1.subscribeToResult(this, closingNotifier, context);
                if (innerSubscription.closed) {
                    this.closeWindow(this.contexts.length - 1);
                }
                else {
                    innerSubscription.context = context;
                    subscription.add(innerSubscription);
                }
                this.destination.next(window);
            }
        }
        else {
            this.closeWindow(this.contexts.indexOf(outerValue));
        }
    }
    notifyError(err) {
        this.error(err);
    }
    notifyComplete(inner) {
        if (inner !== this.openSubscription) {
            this.closeWindow(this.contexts.indexOf(inner.context));
        }
    }
    closeWindow(index) {
        if (index === -1) {
            return;
        }
        const { contexts } = this;
        const context = contexts[index];
        const { window, subscription } = context;
        contexts.splice(index, 1);
        window.complete();
        subscription.unsubscribe();
    }
}

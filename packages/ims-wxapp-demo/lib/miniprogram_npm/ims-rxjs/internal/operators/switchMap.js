"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OuterSubscriber_1 = require("../OuterSubscriber");
const InnerSubscriber_1 = require("../InnerSubscriber");
const subscribeToResult_1 = require("../util/subscribeToResult");
const map_1 = require("./map");
const from_1 = require("../observable/from");
function switchMap(project, resultSelector) {
    if (typeof resultSelector === 'function') {
        return (source) => source.pipe(switchMap((a, i) => from_1.from(project(a, i)).pipe(map_1.map((b, ii) => resultSelector(a, b, i, ii)))));
    }
    return (source) => source.lift(new SwitchMapOperator(project));
}
exports.switchMap = switchMap;
class SwitchMapOperator {
    constructor(project) {
        this.project = project;
    }
    call(subscriber, source) {
        return source.subscribe(new SwitchMapSubscriber(subscriber, this.project));
    }
}
class SwitchMapSubscriber extends OuterSubscriber_1.OuterSubscriber {
    constructor(destination, project) {
        super(destination);
        this.project = project;
        this.index = 0;
    }
    _next(value) {
        let result;
        const index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (error) {
            this.destination.error(error);
            return;
        }
        this._innerSub(result, value, index);
    }
    _innerSub(result, value, index) {
        const innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        const innerSubscriber = new InnerSubscriber_1.InnerSubscriber(this, undefined, undefined);
        const destination = this.destination;
        destination.add(innerSubscriber);
        this.innerSubscription = subscribeToResult_1.subscribeToResult(this, result, value, index, innerSubscriber);
    }
    _complete() {
        const { innerSubscription } = this;
        if (!innerSubscription || innerSubscription.closed) {
            super._complete();
        }
        this.unsubscribe();
    }
    _unsubscribe() {
        this.innerSubscription = null;
    }
    notifyComplete(innerSub) {
        const destination = this.destination;
        destination.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
            super._complete();
        }
    }
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    }
}

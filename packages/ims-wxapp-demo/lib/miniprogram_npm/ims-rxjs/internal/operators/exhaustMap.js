"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OuterSubscriber_1 = require("../OuterSubscriber");
const InnerSubscriber_1 = require("../InnerSubscriber");
const subscribeToResult_1 = require("../util/subscribeToResult");
const map_1 = require("./map");
const from_1 = require("../observable/from");
function exhaustMap(project, resultSelector) {
    if (resultSelector) {
        return (source) => source.pipe(exhaustMap((a, i) => from_1.from(project(a, i)).pipe(map_1.map((b, ii) => resultSelector(a, b, i, ii)))));
    }
    return (source) => source.lift(new ExhaustMapOperator(project));
}
exports.exhaustMap = exhaustMap;
class ExhaustMapOperator {
    constructor(project) {
        this.project = project;
    }
    call(subscriber, source) {
        return source.subscribe(new ExhaustMapSubscriber(subscriber, this.project));
    }
}
class ExhaustMapSubscriber extends OuterSubscriber_1.OuterSubscriber {
    constructor(destination, project) {
        super(destination);
        this.project = project;
        this.hasSubscription = false;
        this.hasCompleted = false;
        this.index = 0;
    }
    _next(value) {
        if (!this.hasSubscription) {
            this.tryNext(value);
        }
    }
    tryNext(value) {
        let result;
        const index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.hasSubscription = true;
        this._innerSub(result, value, index);
    }
    _innerSub(result, value, index) {
        const innerSubscriber = new InnerSubscriber_1.InnerSubscriber(this, undefined, undefined);
        const destination = this.destination;
        destination.add(innerSubscriber);
        subscribeToResult_1.subscribeToResult(this, result, value, index, innerSubscriber);
    }
    _complete() {
        this.hasCompleted = true;
        if (!this.hasSubscription) {
            this.destination.complete();
        }
        this.unsubscribe();
    }
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    }
    notifyError(err) {
        this.destination.error(err);
    }
    notifyComplete(innerSub) {
        const destination = this.destination;
        destination.remove(innerSub);
        this.hasSubscription = false;
        if (this.hasCompleted) {
            this.destination.complete();
        }
    }
}

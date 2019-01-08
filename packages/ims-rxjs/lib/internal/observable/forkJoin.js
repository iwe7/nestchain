"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("../Observable");
const isArray_1 = require("../util/isArray");
const empty_1 = require("./empty");
const subscribeToResult_1 = require("../util/subscribeToResult");
const OuterSubscriber_1 = require("../OuterSubscriber");
const map_1 = require("../operators/map");
function forkJoin(...sources) {
    let resultSelector;
    if (typeof sources[sources.length - 1] === 'function') {
        resultSelector = sources.pop();
    }
    if (sources.length === 1 && isArray_1.isArray(sources[0])) {
        sources = sources[0];
    }
    if (sources.length === 0) {
        return empty_1.EMPTY;
    }
    if (resultSelector) {
        return forkJoin(sources).pipe(map_1.map(args => resultSelector(...args)));
    }
    return new Observable_1.Observable(subscriber => {
        return new ForkJoinSubscriber(subscriber, sources);
    });
}
exports.forkJoin = forkJoin;
class ForkJoinSubscriber extends OuterSubscriber_1.OuterSubscriber {
    constructor(destination, sources) {
        super(destination);
        this.sources = sources;
        this.completed = 0;
        this.haveValues = 0;
        const len = sources.length;
        this.values = new Array(len);
        for (let i = 0; i < len; i++) {
            const source = sources[i];
            const innerSubscription = subscribeToResult_1.subscribeToResult(this, source, null, i);
            if (innerSubscription) {
                this.add(innerSubscription);
            }
        }
    }
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values[outerIndex] = innerValue;
        if (!innerSub._hasValue) {
            innerSub._hasValue = true;
            this.haveValues++;
        }
    }
    notifyComplete(innerSub) {
        const { destination, haveValues, values } = this;
        const len = values.length;
        if (!innerSub._hasValue) {
            destination.complete();
            return;
        }
        this.completed++;
        if (this.completed !== len) {
            return;
        }
        if (haveValues === len) {
            destination.next(values);
        }
        destination.complete();
    }
}

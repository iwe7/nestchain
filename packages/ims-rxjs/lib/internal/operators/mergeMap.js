"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscribeToResult_1 = require("../util/subscribeToResult");
const OuterSubscriber_1 = require("../OuterSubscriber");
const InnerSubscriber_1 = require("../InnerSubscriber");
const map_1 = require("./map");
const from_1 = require("../observable/from");
function mergeMap(project, resultSelector, concurrent = Number.POSITIVE_INFINITY) {
    if (typeof resultSelector === 'function') {
        return (source) => source.pipe(mergeMap((a, i) => from_1.from(project(a, i)).pipe(map_1.map((b, ii) => resultSelector(a, b, i, ii))), concurrent));
    }
    else if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return (source) => source.lift(new MergeMapOperator(project, concurrent));
}
exports.mergeMap = mergeMap;
class MergeMapOperator {
    constructor(project, concurrent = Number.POSITIVE_INFINITY) {
        this.project = project;
        this.concurrent = concurrent;
    }
    call(observer, source) {
        return source.subscribe(new MergeMapSubscriber(observer, this.project, this.concurrent));
    }
}
exports.MergeMapOperator = MergeMapOperator;
class MergeMapSubscriber extends OuterSubscriber_1.OuterSubscriber {
    constructor(destination, project, concurrent = Number.POSITIVE_INFINITY) {
        super(destination);
        this.project = project;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }
    _next(value) {
        if (this.active < this.concurrent) {
            this._tryNext(value);
        }
        else {
            this.buffer.push(value);
        }
    }
    _tryNext(value) {
        let result;
        const index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.active++;
        this._innerSub(result, value, index);
    }
    _innerSub(ish, value, index) {
        const innerSubscriber = new InnerSubscriber_1.InnerSubscriber(this, undefined, undefined);
        const destination = this.destination;
        destination.add(innerSubscriber);
        subscribeToResult_1.subscribeToResult(this, ish, value, index, innerSubscriber);
    }
    _complete() {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
        this.unsubscribe();
    }
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    }
    notifyComplete(innerSub) {
        const buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    }
}
exports.MergeMapSubscriber = MergeMapSubscriber;

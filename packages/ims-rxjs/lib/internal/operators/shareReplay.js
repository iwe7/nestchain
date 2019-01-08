"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReplaySubject_1 = require("../ReplaySubject");
function shareReplay(bufferSize = Number.POSITIVE_INFINITY, windowTime = Number.POSITIVE_INFINITY, scheduler) {
    return (source) => source.lift(shareReplayOperator(bufferSize, windowTime, scheduler));
}
exports.shareReplay = shareReplay;
function shareReplayOperator(bufferSize, windowTime, scheduler) {
    let subject;
    let refCount = 0;
    let subscription;
    let hasError = false;
    let isComplete = false;
    return function shareReplayOperation(source) {
        refCount++;
        if (!subject || hasError) {
            hasError = false;
            subject = new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler);
            subscription = source.subscribe({
                next(value) { subject.next(value); },
                error(err) {
                    hasError = true;
                    subject.error(err);
                },
                complete() {
                    isComplete = true;
                    subject.complete();
                },
            });
        }
        const innerSub = subject.subscribe(this);
        return () => {
            refCount--;
            innerSub.unsubscribe();
            if (subscription && refCount === 0 && isComplete) {
                subscription.unsubscribe();
            }
        };
    };
}

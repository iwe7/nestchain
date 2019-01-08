"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("../Observable");
const async_1 = require("../scheduler/async");
const isNumeric_1 = require("../util/isNumeric");
const isScheduler_1 = require("../util/isScheduler");
function timer(dueTime = 0, periodOrScheduler, scheduler) {
    let period = -1;
    if (isNumeric_1.isNumeric(periodOrScheduler)) {
        period = Number(periodOrScheduler) < 1 && 1 || Number(periodOrScheduler);
    }
    else if (isScheduler_1.isScheduler(periodOrScheduler)) {
        scheduler = periodOrScheduler;
    }
    if (!isScheduler_1.isScheduler(scheduler)) {
        scheduler = async_1.async;
    }
    return new Observable_1.Observable(subscriber => {
        const due = isNumeric_1.isNumeric(dueTime)
            ? dueTime
            : (+dueTime - scheduler.now());
        return scheduler.schedule(dispatch, due, {
            index: 0, period, subscriber
        });
    });
}
exports.timer = timer;
function dispatch(state) {
    const { index, period, subscriber } = state;
    subscriber.next(index);
    if (subscriber.closed) {
        return;
    }
    else if (period === -1) {
        return subscriber.complete();
    }
    state.index = index + 1;
    this.schedule(state, period);
}

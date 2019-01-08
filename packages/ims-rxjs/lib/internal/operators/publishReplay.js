"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReplaySubject_1 = require("../ReplaySubject");
const multicast_1 = require("./multicast");
function publishReplay(bufferSize, windowTime, selectorOrScheduler, scheduler) {
    if (selectorOrScheduler && typeof selectorOrScheduler !== 'function') {
        scheduler = selectorOrScheduler;
    }
    const selector = typeof selectorOrScheduler === 'function' ? selectorOrScheduler : undefined;
    const subject = new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler);
    return (source) => multicast_1.multicast(() => subject, selector)(source);
}
exports.publishReplay = publishReplay;

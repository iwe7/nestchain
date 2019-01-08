"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InnerSubscriber_1 = require("../InnerSubscriber");
const subscribeTo_1 = require("./subscribeTo");
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex)) {
    if (destination.closed) {
        return;
    }
    return subscribeTo_1.subscribeTo(result)(destination);
}
exports.subscribeToResult = subscribeToResult;

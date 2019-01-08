"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("../Observable");
const from_1 = require("./from");
const empty_1 = require("./empty");
function defer(observableFactory) {
    return new Observable_1.Observable(subscriber => {
        let input;
        try {
            input = observableFactory();
        }
        catch (err) {
            subscriber.error(err);
            return undefined;
        }
        const source = input ? from_1.from(input) : empty_1.empty();
        return source.subscribe(subscriber);
    });
}
exports.defer = defer;

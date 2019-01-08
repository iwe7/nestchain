"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("../Observable");
const from_1 = require("./from");
const empty_1 = require("./empty");
function using(resourceFactory, observableFactory) {
    return new Observable_1.Observable(subscriber => {
        let resource;
        try {
            resource = resourceFactory();
        }
        catch (err) {
            subscriber.error(err);
            return undefined;
        }
        let result;
        try {
            result = observableFactory(resource);
        }
        catch (err) {
            subscriber.error(err);
            return undefined;
        }
        const source = result ? from_1.from(result) : empty_1.EMPTY;
        const subscription = source.subscribe(subscriber);
        return () => {
            subscription.unsubscribe();
            if (resource) {
                resource.unsubscribe();
            }
        };
    });
}
exports.using = using;

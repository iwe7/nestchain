"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let client = redis_1.createClient();
var ImsCacheModel;
(function (ImsCacheModel) {
    ImsCacheModel["EX"] = "EX";
    ImsCacheModel["PX"] = "PX";
    ImsCacheModel["NX"] = "NX";
    ImsCacheModel["XX"] = "XX";
})(ImsCacheModel = exports.ImsCacheModel || (exports.ImsCacheModel = {}));
class ImsCache {
    static set(key, value, model, duration) {
        return new rxjs_1.Observable(obs => {
            client.set(key, value, model, duration, (err, res) => {
                debugger;
                if (err)
                    obs.error(err);
                obs.next(value);
                obs.complete();
            });
        });
    }
    static get(key) {
        return new rxjs_1.Observable(obs => {
            client.get(key, (err, reply) => {
                if (err)
                    obs.error(err);
                obs.next(reply);
                obs.complete();
            });
        });
    }
    static del(key) {
        return new rxjs_1.Observable(obs => {
            client.del(key, (err, reply) => {
                if (err)
                    obs.error(err);
                obs.next(reply);
                obs.complete();
            });
        });
    }
    static keys(pattern) {
        return new rxjs_1.Observable(obs => {
            client.keys(pattern, (err, reply) => {
                if (err)
                    obs.error(err);
                obs.next(reply);
                obs.complete();
            });
        });
    }
    static clean() {
        return this.keys('*').pipe(operators_1.switchMap(keys => {
            if (keys.length > 0) {
                return rxjs_1.forkJoin(keys.map(key => this.del(key))).pipe(operators_1.map(() => true));
            }
            else {
                rxjs_1.of(true);
            }
        }));
    }
}
exports.ImsCache = ImsCache;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dns_1 = require("dns");
const net_1 = require("net");
const rxjs_1 = require("rxjs");
exports.default = (ip) => {
    return new rxjs_1.Observable((obs) => {
        if (net_1.isIPv4(ip)) {
            obs.next(ip);
            obs.complete();
        }
        else {
            dns_1.lookup(ip, { family: 4 }, (err, address) => {
                if (err)
                    obs.error(err);
                obs.next(address);
                obs.complete();
            });
        }
    });
};

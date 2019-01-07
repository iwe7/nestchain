"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const del = require("del");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
exports.clean = (src) => {
    let run = rxjs_1.from(del(src)).pipe(operators_1.tap(() => console.log(`clean ${src}`)));
    return {
        run,
    };
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_gulp_1 = require("ims-gulp");
const base_1 = require("../base");
class PackagesCommand extends base_1.ImsBinBase {
    match(s, ...args) {
        if (s === 'packages' || s === 'p') {
            args.forEach(it => {
                Object.keys(it).forEach(key => {
                    let val = it[key];
                    if (key === 'name' || key === 'n') {
                        this.name = val;
                    }
                });
            });
            return true;
        }
        return false;
    }
    run() {
        console.log(this.name);
        return ims_gulp_1.gulpPackages(this.name);
    }
}
exports.PackagesCommand = PackagesCommand;

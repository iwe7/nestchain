"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
const ims_gulp_1 = require("ims-gulp");
class PackagesCommand extends base_1.ImsBinBase {
    match(s, ...args) {
        if (s === 'packages') {
            return true;
        }
        return false;
    }
    run() {
        console.log(`
/**
 * packages command
 **/
    `);
        return ims_gulp_1.doPackages();
    }
}
exports.PackagesCommand = PackagesCommand;

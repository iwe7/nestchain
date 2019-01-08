"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_gulp_1 = require("ims-gulp");
const base_1 = require("../base");
class CleanCommand extends base_1.ImsBinBase {
    match(s, ...args) {
        if (s === 'clean') {
            return true;
        }
        return false;
    }
    run() {
        console.log(`
    /**
     * clean command
     **/
        `);
        return ims_gulp_1.clean;
    }
}
exports.CleanCommand = CleanCommand;

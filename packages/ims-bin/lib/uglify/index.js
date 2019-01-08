"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_gulp_1 = require("ims-gulp");
const base_1 = require("../base");
class UglifyCommand extends base_1.ImsBinBase {
    match(s, ...args) {
        if (s === 'uglify') {
            return true;
        }
        return false;
    }
    run() {
        console.log(`
    /**
     * uglify command
     **/
        `);
        return ims_gulp_1._uglify();
    }
}
exports.UglifyCommand = UglifyCommand;

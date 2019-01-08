"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
const ims_gulp_1 = require("ims-gulp");
class WxappCommand extends base_1.ImsBinBase {
    match(s, ...args) {
        if (s === 'wxapp') {
            return true;
        }
        return false;
    }
    run() {
        console.log(`
/**
 * wxapp command
 **/
    `);
        return ims_gulp_1.gulpWeixin();
    }
}
exports.WxappCommand = WxappCommand;

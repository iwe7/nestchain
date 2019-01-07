"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_const_1 = require("ims-const");
const path = require("path");
const ims_gulp_1 = require("ims-gulp");
const base_1 = require("../base");
class PackagesCommand extends base_1.ImsBinBase {
    constructor() {
        super(...arguments);
        this.root = path.join(ims_const_1.ROOT, 'www/public');
    }
    match(s, ...args) {
        return s === 'packages' || s === 'p';
    }
    run() {
        return ims_gulp_1.gulpPackages();
    }
}
exports.PackagesCommand = PackagesCommand;

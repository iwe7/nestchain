"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_webpack_manifest_1 = require("ims-webpack-manifest");
const ims_const_1 = require("ims-const");
const path = require("path");
const ims_webpack_util_1 = require("ims-webpack-util");
const webpack = require("webpack");
const base_1 = require("../base");
class BuildCommand extends base_1.ImsBinBase {
    constructor() {
        super(...arguments);
        this.root = path.join(ims_const_1.ROOT, 'www/public');
    }
    match(s, ...args) {
        if (s === 'build') {
            args.forEach(it => {
                Object.keys(it).forEach(key => {
                    let val = it[key];
                    key = key + '';
                    if (key === 'p' || key === 'platform') {
                        this.platform = val;
                    }
                    else if (key === 'n' || key === 'name') {
                        this.name = val;
                    }
                    else if (key === 't' || key === 'type') {
                        this.type = val;
                    }
                });
            });
            return true;
        }
        return false;
    }
    run() {
        this.platform = this.platform || 'web';
        switch (this.type) {
            case 'dll':
                let cfg = ims_webpack_manifest_1.default(this.root, this.platform);
                webpack(cfg).run(ims_webpack_util_1.handlerError());
                break;
            default:
                throw new Error(`can't find ${this.type}`);
        }
    }
}
exports.BuildCommand = BuildCommand;

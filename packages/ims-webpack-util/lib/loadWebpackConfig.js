"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
function loadWebpackConfig(webpackConfigPath) {
    return rxjs_1.from(Promise.resolve().then(() => require(webpackConfigPath)));
}
exports.loadWebpackConfig = loadWebpackConfig;

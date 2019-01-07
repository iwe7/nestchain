"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const webpack = require("webpack");
function runWebpack(cfg, loggingCb) {
    return new rxjs_1.Observable(obs => {
        const webpackCompiler = webpack(cfg);
        const callback = (err, stats) => {
            if (err) {
                return obs.error(err);
            }
            loggingCb && loggingCb(stats, cfg);
            obs.next({ success: !stats.hasErrors() });
            if (!cfg.watch) {
                obs.complete();
            }
        };
        try {
            if (cfg.watch) {
                const watchOptions = cfg.watchOptions || {};
                const watching = webpackCompiler.watch(watchOptions, callback);
                console.log('webpack watch');
                return () => watching.close(() => { });
            }
            else {
                webpackCompiler.run(callback);
            }
        }
        catch (err) {
            return obs.error(err);
        }
    });
}
exports.runWebpack = runWebpack;

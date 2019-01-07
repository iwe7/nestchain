"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebpackDevServer = require("webpack-dev-server");
const rxjs_1 = require("rxjs");
const webpack = require("webpack");
const ims_util_1 = require("ims-util");
const getBase_1 = require("./getBase");
const base = getBase_1.getBase();
function runWebpackDevServer(webpackConfig, devServerCfg, loggingCb) {
    return new rxjs_1.Observable(obs => {
        const devServerConfig = devServerCfg || webpackConfig.devServer || {};
        devServerConfig.host = devServerConfig.host || 'localhost';
        devServerConfig.port = devServerConfig.port || 8080;
        if (devServerConfig.stats) {
            webpackConfig.stats = devServerConfig.stats;
        }
        devServerConfig.stats = false;
        let cfg = ims_util_1.merge(base, webpackConfig);
        const webpackCompiler = webpack(cfg);
        const server = new WebpackDevServer(webpackCompiler, devServerConfig);
        webpackCompiler.hooks.done.tap('build-webpack', stats => {
            loggingCb(stats, cfg);
            obs.next({ success: !stats.hasErrors() });
        });
        server.listen(devServerConfig.port, devServerConfig.host, err => {
            if (err) {
                obs.error(err);
            }
        });
        return () => server.close();
    });
}
exports.runWebpackDevServer = runWebpackDevServer;

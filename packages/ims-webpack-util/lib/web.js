"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_util_1 = require("ims-util");
const webpack_1 = require("webpack");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBar = require("webpackbar");
const getBase_1 = require("./getBase");
const webpackBase = getBase_1.getBase();
let root = process.cwd();
const path_1 = require("path");
function getWebConfig({ watch, index, from, to }) {
    let cfg = ims_util_1.merge({
        mode: 'development',
        target: 'web',
        devtool: 'source-map',
        node: { global: true },
        watch: watch,
        entry: {
            main: from,
        },
        output: {
            path: to,
            filename: '[name].js',
        },
        resolve: {
            mainFields: ['browser', 'main'],
            alias: {
                imeepos: `${root}/packages/`,
            },
        },
        plugins: [
            new webpack_1.DllReferencePlugin({
                context: '.',
                manifest: path_1.join(root, 'cache/dll/react.manifest.json'),
            }),
            new webpack_1.DllReferencePlugin({
                context: '.',
                manifest: path_1.join(root, 'cache/dll/polyfill.manifest.json'),
            }),
            new webpack_1.DllReferencePlugin({
                context: '.',
                manifest: path_1.join(root, 'cache/dll/socket.manifest.json'),
            }),
            new webpack_1.DllReferencePlugin({
                context: '.',
                manifest: path_1.join(root, 'cache/dll/rxjs.manifest.json'),
            }),
            new webpack_1.DllReferencePlugin({
                context: '.',
                manifest: path_1.join(root, 'cache/dll/ramda.manifest.json'),
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: index,
                title: 'demo',
            }),
            new webpack_1.WatchIgnorePlugin([/css\.d\.ts$/]),
            new WebpackBar(),
            new webpack_1.HashedModuleIdsPlugin(),
            new FriendlyErrorsPlugin(),
        ],
        module: {
            rules: [],
        },
        resolveLoader: {},
    }, webpackBase);
    return cfg;
}
exports.getWebConfig = getWebConfig;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const DllPlugin = require("webpack/lib/DllPlugin");
const ims_const_1 = require("ims-const");
function getWebapckDll(dll, platform) {
    return {
        entry: {
            react: ['react', 'react-dom'],
            polyfill: [
                'core-js/fn/object/assign',
                'core-js/fn/promise',
                'whatwg-fetch',
            ],
            socket: ['socket.io-client'],
            rxjs: ['rxjs'],
            ramda: ['ramda'],
        },
        output: {
            filename: '[name].dll.js',
            path: path.join(dll, platform, 'library'),
            library: '_dll_[name]',
        },
        resolve: {
            mainFields: ['browser', 'main'],
            alias: {
                'ims-*': path.join(ims_const_1.ROOT, 'packages'),
            },
        },
        plugins: [
            new DllPlugin({
                name: '_dll_[name]',
                path: path.join(dll, platform, 'library/[name].manifest.json'),
            }),
        ],
    };
}
exports.getWebapckDll = getWebapckDll;
exports.default = getWebapckDll;

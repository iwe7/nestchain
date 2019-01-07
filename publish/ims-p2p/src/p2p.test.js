"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const connection_1 = require("./connection");
const listen_1 = require("./listen");
let TestListen = class TestListen {
};
TestListen = tslib_1.__decorate([
    listen_1.Listen({
        host: '127.0.0.1',
        port: 3000,
        path: '/test',
    })
], TestListen);
exports.TestListen = TestListen;
let TestConnection = class TestConnection {
};
TestConnection = tslib_1.__decorate([
    connection_1.Connection({
        host: '127.0.0.1',
        port: 3000,
        path: '/test',
    })
], TestConnection);
exports.TestConnection = TestConnection;

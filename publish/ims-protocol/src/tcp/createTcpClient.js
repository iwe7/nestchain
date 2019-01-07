"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
function createTcpClient(options) {
    return net.createConnection({
        port: options.port,
        host: options.host,
        family: options.family.code,
    });
}
exports.createTcpClient = createTcpClient;

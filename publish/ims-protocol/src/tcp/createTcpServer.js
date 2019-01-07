"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
function createTcpServer(options) {
    let server = net.createServer(socket => {
        socket.setEncoding('utf8');
    });
    return server;
}
exports.createTcpServer = createTcpServer;

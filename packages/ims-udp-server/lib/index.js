"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dgram = require("dgram");
class ImsUdpSocket {
    constructor(socket) {
        this.socket = socket;
        this.socket.on('close', this.onClose.bind(this));
        this.socket.on('error', this.onError.bind(this));
        this.socket.on('listening', this.onListening.bind(this));
        this.socket.on('message', this.onMessage.bind(this));
    }
}
exports.ImsUdpSocket = ImsUdpSocket;
class ImsUdpSocketDefault extends ImsUdpSocket {
    onClose() {
        console.log('on close');
    }
    onError(err) {
        throw err;
    }
    onListening() {
        console.log('on listening');
    }
    onMessage(msg, rinfo) {
        console.log('on message');
    }
}
exports.ImsUdpSocketDefault = ImsUdpSocketDefault;
class ImsUdpServer {
    constructor(opt, typeSocket = ImsUdpSocketDefault) {
        this.typeSocket = typeSocket;
        let { port, host, ...opts } = opt;
        let socket = dgram.createSocket(opts);
        this.socket = new this.typeSocket(socket);
        socket.bind(port, host);
    }
}
exports.ImsUdpServer = ImsUdpServer;

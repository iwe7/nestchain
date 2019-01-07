"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_udp_server_1 = require("ims-udp-server");
const dgram = require("dgram");
class ImsUdpSocket extends ims_udp_server_1.ImsUdpSocket {
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
    send(data) {
        this.socket.send(data, 0, data.length, this.port, this.address);
    }
}
exports.ImsUdpSocketDefault = ImsUdpSocketDefault;
class ImsUdpClient {
    constructor(opt, typeSocket = ImsUdpSocketDefault) {
        this.typeSocket = typeSocket;
        let { port, host, ...opts } = opt;
        let socket = dgram.createSocket(opts);
        this.socket = new this.typeSocket(socket);
        this.socket.port = port;
        this.socket.address = host;
    }
    send(data) {
        this.socket.send(data);
    }
}
exports.ImsUdpClient = ImsUdpClient;

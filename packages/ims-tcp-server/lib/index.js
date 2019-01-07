"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
var net_1 = require("net");
exports.Socket = net_1.Socket;
class ImsNetSocket {
    constructor(socket) {
        this.socket = socket;
        socket.on('close', this.onClose.bind(this));
        socket.on('connect', this.onListener.bind(this));
        socket.on('data', this.onData.bind(this));
        socket.on('drain', this.onDrain.bind(this));
        socket.on('end', this.onEnd.bind(this));
        socket.on('error', this.onError.bind(this));
        socket.on('lookup', this.onLookUp.bind(this));
        socket.on('timeout', this.onTimeout.bind(this));
    }
}
exports.ImsNetSocket = ImsNetSocket;
class ImsNetSocketDefault extends ImsNetSocket {
    onClose(had_error) {
        console.log('on close');
    }
    onListener() {
        this.socket.write(JSON.stringify({
            type: 'listener',
        }));
    }
    onData(data) {
        console.log('on data');
    }
    onDrain() {
        console.log('on drain');
    }
    onEnd() {
        console.log('on end');
    }
    onError(err) {
        throw err;
    }
    onLookUp(err, address, family, host) {
        console.log('on look up');
    }
    onTimeout() {
        console.log('on timeout');
    }
}
exports.ImsNetSocketDefault = ImsNetSocketDefault;
class ImsNetServer {
    constructor(server, typeSocket = ImsNetSocketDefault) {
        this.server = server;
        this.typeSocket = typeSocket;
        server.on('listening', this.onListening.bind(this));
        server.on('error', this.onError.bind(this));
        server.on('close', this.onClose.bind(this));
        server.on('connection', this.onConnection.bind(this));
    }
}
exports.ImsNetServer = ImsNetServer;
class ImsNetServerDefault extends ImsNetServer {
    onClose() {
        console.log('on close');
    }
    onError(err) {
        console.log('on error');
    }
    onListening() {
        console.log('on listening');
    }
    onConnection(socket) {
        this.connection = new this.typeSocket(socket);
    }
}
exports.ImsNetServerDefault = ImsNetServerDefault;
class ImsTcpServer {
    constructor(opt, typeServer = ImsNetServerDefault) {
        this.opt = opt;
        this.typeServer = typeServer;
        let server = net.createServer();
        this.server = new typeServer(server);
        server.listen(opt);
    }
}
exports.ImsTcpServer = ImsTcpServer;

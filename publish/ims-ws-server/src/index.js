"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
class WsConnection {
    constructor(ws, request) {
        this.ws = ws;
        this.request = request;
        this.ws.on('message', this.onMessage.bind(this));
        this.ws.on('error', this.onError.bind(this));
        this.ws.on('close', this.onClose.bind(this));
        this.ws.on('open', this.onOpen.bind(this));
        this.ws.on('upgrade', this.onUpgrade.bind(this));
        this.ws.on('ping', this.onPing.bind(this));
        this.ws.on('pong', this.onPong.bind(this));
        this.ws.on('unexpected-response', this.onUnexpectedResponse.bind(this));
    }
}
exports.WsConnection = WsConnection;
class WsConnectionDefault extends WsConnection {
    onUpgrade(request) {
        console.log('on upgrade');
    }
    onPing(data) {
        console.log('on ping');
    }
    onPong(data) {
        console.log('on pong');
    }
    onMessage(data) {
        console.log('on message');
    }
    onUnexpectedResponse(request, response) {
        console.log('on unexpected response');
    }
    onError(err) {
        throw err;
    }
    onClose(code, reason) {
        console.log('on close');
    }
    onOpen() {
        console.log('on open');
        this.ws.send('open');
    }
}
exports.WsConnectionDefault = WsConnectionDefault;
class WsServer {
    constructor(server, typeConection = WsConnectionDefault) {
        this.server = server;
        this.typeConection = typeConection;
        this.server.on('connection', this.onConnection.bind(this));
        this.server.on('error', this.onError.bind(this));
        this.server.on('headers', this.onHeaders.bind(this));
        this.server.on('listening', this.onListening.bind(this));
        this.server.on('message', this.onMessage.bind(this));
    }
}
exports.WsServer = WsServer;
class WsServerDefault extends WsServer {
    onListening() {
        console.log('on listening');
    }
    onHeaders(headers, request) {
        console.log('on headers');
    }
    onError(err) {
        throw err;
    }
    onConnection(socket, request) {
        console.log('on connection');
        return new this.typeConection(socket, request);
    }
    onMessage(data) {
        console.log('on data');
    }
}
exports.WsServerDefault = WsServerDefault;
class ImsWsServer {
    constructor(opt, typeWsServer = WsServerDefault) {
        this.typeWsServer = typeWsServer;
        let server = new WebSocket.Server(opt);
        this.ws = new this.typeWsServer(server);
    }
}
exports.ImsWsServer = ImsWsServer;

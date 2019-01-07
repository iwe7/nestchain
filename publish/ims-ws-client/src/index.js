"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
class WsClient {
    constructor(ws) {
        this.ws = ws;
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
exports.WsClient = WsClient;
class WsClientDefault extends WsClient {
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
exports.WsClientDefault = WsClientDefault;
class ImsWsClient {
    constructor(opt, typeClient = WsClientDefault) {
        this.typeClient = typeClient;
        let { address, ...opts } = opt;
        let client = new WebSocket(address, opts);
        this.client = new this.typeClient(client);
    }
}
exports.ImsWsClient = ImsWsClient;

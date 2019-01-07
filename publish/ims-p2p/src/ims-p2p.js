"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const net = require("net");
class ImsP2p {
    constructor(address, servers) {
        this.servers = new Map();
        this.clients = new Map();
        this.address = util_1.toMulitaddr(address);
        servers
            .map(server => util_1.toMulitaddr(server))
            .forEach(ser => {
            this.servers.set(ser.address, ser);
        });
        this.initServer();
        this.initPing();
    }
    initPing() {
        setInterval(() => {
            this.clients.forEach((client, address) => {
                this.send(client, 'ping', { address });
            });
        }, 10000);
    }
    parse(str) {
        let datas = str.split('\n');
        if (datas.length === 2) {
            let len = parseInt(datas[0]);
            if (len === datas[1].length) {
                return JSON.parse(datas[1]);
            }
        }
        return {};
    }
    stringify(type, data) {
        return JSON.stringify({
            type: type,
            payload: data,
        });
    }
    send(server, type, data) {
        let str = this.stringify(type, data);
        server.write(`${str.length}\n${str}`);
    }
    initServer() {
        let server = net.createServer((socket) => {
            socket.setEncoding('utf8');
            socket.on('data', (data) => {
                let str = data.toString();
                this.handlerServerData(this.parse(str), socket);
            });
            socket.on('close', () => { });
        });
        server.listen(this.address.port, this.address.host, () => {
            this.servers.forEach(addr => this.initClient(addr));
        });
    }
    initClient(address) {
        const server = net.createConnection(address.port, address.host);
        server.on('data', (data) => {
            let str = data.toString();
            this.handlerClientData(this.parse(str), server);
        });
        server.on('connect', () => {
            this.send(server, 'connect', { address: address.address });
        });
        return server;
    }
    handlerClientData(data, socket) {
        switch (data.type) {
            case 'ping':
                break;
            default:
                console.log(data);
        }
    }
    handlerServerData(data, socket) {
        switch (data.type) {
            case 'connect':
                this.clients.set(data.payload.address, socket);
                break;
            case 'ping':
                break;
            default:
                console.log(data);
        }
        console.log(data);
    }
}
exports.ImsP2p = ImsP2p;
new ImsP2p('/ip4/127.0.0.1/tcp/3000', []);
new ImsP2p('/ip4/127.0.0.1/tcp/3001', ['/ip4/127.0.0.1/tcp/3000']);
new ImsP2p('/ip4/127.0.0.1/tcp/3002', [
    '/ip4/127.0.0.1/tcp/3000',
    '/ip4/127.0.0.1/tcp/3001',
]);

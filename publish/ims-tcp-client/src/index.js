"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
const ims_tcp_server_1 = require("ims-tcp-server");
class ImsTcpClient {
    constructor(opt, typeSocket = ims_tcp_server_1.ImsNetSocketDefault) {
        this.opt = opt;
        this.typeSocket = typeSocket;
        let socket = net.connect(this.opt);
        this.socket = new this.typeSocket(socket);
    }
}
exports.ImsTcpClient = ImsTcpClient;

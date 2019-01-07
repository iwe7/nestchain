"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multiaddr = require("multiaddr");
function toMulitaddr(address, path) {
    const addr = multiaddr(address);
    const protos = addr.protos();
    const opt = addr.toOptions();
    let result = {
        host: opt.host,
        port: opt.port,
        transport: protos[1],
        family: protos[0],
        address: address,
        path: path,
    };
    return result;
}
exports.toMulitaddr = toMulitaddr;

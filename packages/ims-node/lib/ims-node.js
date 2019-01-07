"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multiaddr = require("multiaddr");
class ImsNode {
    constructor(address) {
        this.multiaddr = multiaddr(address);
    }
}
exports.ImsNode = ImsNode;
let node = new ImsNode('/ip4/120.0.0.1/tcp/1234');
debugger;

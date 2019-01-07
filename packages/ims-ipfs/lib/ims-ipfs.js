"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IPFS = require("ipfs");
class ImsIpfs {
    constructor(options) {
        this.node = new IPFS(options);
    }
    id(fn) {
        return this.node.id(fn);
    }
    on(type, fn) {
        return this.node.on(type, fn);
    }
    stop(fn) {
        return this.node.stop(fn);
    }
}
exports.ImsIpfs = ImsIpfs;

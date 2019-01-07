"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const net = require("net");
const rxjs_1 = require("rxjs");
const dgram = require("dgram");
function bootstrap(address) {
    return new rxjs_1.Observable(obs => {
        let addr = util_1.toMulitaddr(address);
        const name = addr.transport.name;
        if (name === 'tcp') {
            let server = net.createServer();
            obs.next(server);
            obs.complete();
        }
        else if (name === 'udp') {
            let server = dgram.createSocket('udp4');
            obs.next(server);
            obs.complete();
        }
        else {
            obs.error(`不支持协议${addr.transport.name}`);
        }
    });
}
exports.bootstrap = bootstrap;
bootstrap(`/ip4/127.0.0.1/http/3000`).subscribe(res => console.log(res));

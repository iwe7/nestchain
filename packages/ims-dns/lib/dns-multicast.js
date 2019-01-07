"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const dgram = require("dgram");
const dns_1 = require("./dns");
var multicastDns = require('multicast-dns');
class ImsMulticastDns extends events_1.EventEmitter {
    constructor(opts = {}) {
        super();
        opts = { ...ImsMulticastDns.defaultOptions, ...opts };
        let { type, port, ip, host, socket, reuseAddr } = opts;
        ip = ip || host || (type === 'udp4' ? '224.0.0.251' : null);
        let me = { address: ip, port: port };
        if (type === 'udp6' && (!ip || !opts.interface)) {
            throw new Error('For IPv6 multicast you must specify `ip` and `interface`');
        }
        socket =
            socket ||
                dgram.createSocket({
                    type,
                    reuseAddr: reuseAddr !== false,
                });
        socket.on('error', (err) => {
            if (err.code === 'EACCES' || err.code === 'EADDRINUSE')
                this.emit('error', err);
            else
                this.emit('warning', err);
        });
        socket.on('message', (message, rinfo) => {
            try {
                message = dns_1.ImsDns.decode(message);
            }
            catch (err) {
                this.emit('warning', err);
                return;
            }
            this.emit('packet', message, rinfo);
            if (message.type === 'query')
                this.emit('query', message, rinfo);
            if (message.type === 'response')
                this.emit('response', message, rinfo);
        });
    }
    static query() { }
}
ImsMulticastDns.defaultOptions = {
    port: 5353,
    type: 'udp4',
    ip: null,
    host: null,
    reuseAddr: false,
};
exports.ImsMulticastDns = ImsMulticastDns;

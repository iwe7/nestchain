import dgram = require('dgram');
import net = require('net');
import thunky = require('thunky');
import os = require('os');
import { Injectable } from 'ims-core';
import { EventEmitter } from 'events';
let noop = function() {};
export interface DnsOptions {
  port?: number;
  type?: 'udp6' | 'udp4';
  ip?: string;
  host?: string;
  interface?: any;
  socket?: dgram.Socket;
  reuseAddr?: boolean;
  multicast?: boolean;
  loopback?: boolean;
  ttl?: number;
  bind?: boolean;
}

import { DnsPacket, IDnsPacket, IDnsPacketFlags } from 'ims-dns-packet';

@Injectable()
export class Dns extends EventEmitter {
  me: { address: string; port: number };
  socket: dgram.Socket;
  ip: string;
  bind: any;
  destroyed: boolean = false;
  interval: any;
  memberships: any = {};

  constructor(public opts: DnsOptions, public packet: DnsPacket) {
    super();
    let port = typeof opts.port === 'number' ? opts.port : 5353;
    let type = opts.type || 'udp4';
    this.ip = opts.ip || opts.host || (type === 'udp4' ? '224.0.0.251' : null);
    this.me = { address: this.ip, port: port };
    if (type === 'udp6' && (!this.ip || !opts.interface)) {
      throw new Error(
        'For IPv6 multicast you must specify `ip` and `interface`',
      );
    }
    this.socket =
      opts.socket ||
      dgram.createSocket({
        type: type,
        reuseAddr: opts.reuseAddr !== false,
      });
    this.socket.on('error', (err: Error & { code: string }) => {
      if (err.code === 'EACCES' || err.code === 'EADDRINUSE')
        this.emit('error', err);
      else this.emit('warning', err);
    });
    this.socket.on('message', (message: IDnsPacket, rinfo) => {
      try {
        message = packet.decode(message);
      } catch (err) {
        this.emit('warning', err);
        return;
      }
      this.emit('packet', message, rinfo);
      if (message.type === 'query') this.emit('query', message, rinfo);
      if (message.type === 'response') this.emit('response', message, rinfo);
    });
    this.socket.on('listening', () => {
      if (!port)
        port = this.me.port = (this.socket.address() as net.AddressInfo).port;
      if (opts.multicast !== false) {
        this.update();
        this.interval = setInterval(() => this.update(), 5000);
        this.socket.setMulticastTTL(opts.ttl || 255);
        this.socket.setMulticastLoopback(opts.loopback !== false);
      }
    });
    this.bind = thunky((cb: any) => {
      if (!port || opts.bind === false) return cb(null);
      this.socket.once('error', cb);
      this.socket.bind(port, opts.interface, () => {
        this.socket.removeListener('error', cb);
        cb(null);
      });
    });
    this.bind(err => {
      if (err) return this.emit('error', err);
      this.emit('ready');
    });
  }

  async send(
    value: IDnsPacket,
    rinfo: { host?: string; address?: string; port: number },
  ) {
    if (typeof rinfo === 'function') return await this.send(value, null);
    if (!rinfo) rinfo = this.me;
    else if (!rinfo.host && !rinfo.address) rinfo.address = this.me.address;
    return new Promise((resolve, reject) => {
      let onbind = err => {
        if (this.destroyed) resolve();
        if (err) return reject(err);
        var message = this.packet.encode(value);
        this.socket.send(
          message,
          0,
          message.length,
          rinfo.port,
          rinfo.address || rinfo.host,
          () => {
            resolve();
          },
        );
      };
      this.bind(onbind);
    });
  }
  async respond(
    res: IDnsPacket,
    rinfo: { host?: string; address?: string; port: number },
  ) {
    if (Array.isArray(res)) res = { answers: res };
    res.type = 'response';
    res.flags = (res.flags || 0) | IDnsPacketFlags.AUTHORITATIVE_ANSWER;
    return await this.send(res, rinfo);
  }
  async query(q: IDnsPacket, type?: 'query' | 'response', rinfo?) {
    q.type = 'query';
    await this.send(q, rinfo);
  }
  destroy() {
    return new Promise((resolve, reject) => {
      if (this.destroyed) {
        resolve();
      } else {
        this.destroyed = true;
        clearInterval(this.interval);
        this.socket.once('close', () => {
          resolve();
        });
        this.socket.close();
      }
    });
  }
  update() {
    var ifaces = this.opts.interface
      ? [].concat(this.opts.interface)
      : allInterfaces();
    var updated = false;

    for (var i = 0; i < ifaces.length; i++) {
      var addr = ifaces[i];

      if (this.memberships[addr]) continue;
      this.memberships[addr] = true;
      updated = true;

      try {
        this.socket.addMembership(this.ip, addr);
      } catch (err) {
        this.emit('warning', err);
      }
    }

    if (!updated || !this.socket.setMulticastInterface) return;
    this.socket.setMulticastInterface(
      this.opts.interface || defaultInterface(),
    );
  }
}

function allInterfaces() {
  var networks = os.networkInterfaces();
  var names = Object.keys(networks);
  var res = [];

  for (var i = 0; i < names.length; i++) {
    var net = networks[names[i]];
    for (var j = 0; j < net.length; j++) {
      var iface = net[j];
      if (iface.family === 'IPv4') {
        res.push(iface.address);
        break;
      }
    }
  }
  return res;
}

function defaultInterface() {
  var networks = os.networkInterfaces();
  var names = Object.keys(networks);

  for (var i = 0; i < names.length; i++) {
    var net = networks[names[i]];
    for (var j = 0; j < net.length; j++) {
      var iface = net[j];
      if (iface.family === 'IPv4' && !iface.internal) return '0.0.0.0';
    }
  }
  return '127.0.0.1';
}

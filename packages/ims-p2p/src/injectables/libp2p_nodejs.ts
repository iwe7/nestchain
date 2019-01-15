import { Injectable } from 'ims-core';

const TCP = require('libp2p-tcp');
const MulticastDNS = require('libp2p-mdns');
const WS = require('libp2p-websockets');
const WebSocketStar = require('libp2p-websocket-star');
const Bootstrap = require('libp2p-bootstrap');
const KadDHT = require('libp2p-kad-dht');
const Multiplex = require('libp2p-mplex');
const SECIO = require('libp2p-secio');
const libp2p = require('libp2p');
const defaultsDeep = require('@nodeutils/defaults-deep');

@Injectable({
  providedIn: 'root',
})
export class Libp2pNodeJsFactory {
  create(_options: any) {
    const wsstar = new WebSocketStar({ id: _options.peerInfo.id });
    const defaults = {
      modules: {
        transport: [TCP, WS, wsstar],
        streamMuxer: [Multiplex],
        connEncryption: [SECIO],
        peerDiscovery: [MulticastDNS, Bootstrap, wsstar.discovery],
        dht: KadDHT,
      },
      config: {
        peerDiscovery: {
          mdns: {
            enabled: true,
          },
          bootstrap: {
            enabled: true,
          },
          websocketStar: {
            enabled: true,
          },
        },
        dht: {
          kBucketSize: 20,
        },
        EXPERIMENTAL: {
          dht: false,
          pubsub: false,
        },
      },
    };
    return new libp2p(defaultsDeep(_options, defaults));
  }
}

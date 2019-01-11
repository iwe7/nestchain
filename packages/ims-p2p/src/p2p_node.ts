import { Injectable } from 'ims-core';
import TCP = require('libp2p-tcp');
import MulticastDNS = require('libp2p-mdns');
import WS = require('libp2p-websockets');
import WebSocketStar = require('libp2p-websocket-star');
import Bootstrap = require('libp2p-bootstrap');
import KadDHT = require('libp2p-kad-dht');
import Multiplex = require('libp2p-mplex');
import SECIO = require('libp2p-secio');
import libp2p = require('libp2p');
import defaultsDeep = require('@nodeutils/defaults-deep');
import get = require('lodash/get');
export class P2pNode {
  p2p: any;
  constructor(opt: any) {
    const wsstar = new WebSocketStar({ id: opt.peerInfo.id });
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
    let opts = defaultsDeep(opt, defaults);
    this.p2p = new libp2p(opts);
  }
  start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.p2p.start(err => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
  dialProtocol(peer, protocol) {
    return new Promise((resolve, reject) => {
      this.p2p.dialProtocol(peer, protocol, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
  on(type: string, fuc: Function) {
    this.p2p.on(type, fuc);
  }
  handle(type: string, func: Function) {
    this.p2p.handle(type, func);
  }
}

@Injectable()
export class P2pNodeFactory {
  constructor() {}
  create(opt: any): P2pNode {
    const _default = {
      datastore: opt.datastore,
      peerInfo: opt.peerInfo,
      peerBook: opt.peerBook,
      config: {
        peerDiscovery: {
          mdns: {
            enabled: get(
              opt.options,
              'config.Discovery.MDNS.Enabled',
              get(opt.config, 'Discovery.MDNS.Enabled', true),
            ),
          },
          webRTCStar: {
            enabled: get(
              opt.options,
              'config.Discovery.webRTCStar.Enabled',
              get(opt.config, 'Discovery.webRTCStar.Enabled', true),
            ),
          },
          bootstrap: {
            list: get(
              opt.options,
              'config.Bootstrap',
              get(opt.config, 'Bootstrap', []),
            ),
          },
        },
        relay: {
          enabled: get(
            opt.options,
            'relay.enabled',
            get(opt.config, 'relay.enabled', false),
          ),
          hop: {
            enabled: get(
              opt.options,
              'relay.hop.enabled',
              get(opt.config, 'relay.hop.enabled', false),
            ),
            active: get(
              opt.options,
              'relay.hop.active',
              get(opt.config, 'relay.hop.active', false),
            ),
          },
        },
        dht: {
          validators: {
            ipns: {},
          },
          selectors: {
            ipns: {},
          },
        },
        EXPERIMENTAL: {
          dht: get(opt.options, 'EXPERIMENTAL.dht', false),
          pubsub: get(opt.options, 'EXPERIMENTAL.pubsub', false),
        },
      },
    };
    const libp2pOptions = defaultsDeep(opt, _default);
    return new P2pNode(libp2pOptions);
  }
}

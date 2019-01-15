import PeerInfo = require('peer-info');
import PeerId = require('peer-id');

const libp2p = require('libp2p');
const TCP = require('libp2p-tcp');
const WS = require('libp2p-websockets');
const SPDY = require('libp2p-spdy');
const MPLEX = require('libp2p-mplex');
const SECIO = require('libp2p-secio');
const MulticastDNS = require('libp2p-mdns');
const DHT = require('libp2p-kad-dht');
const defaultsDeep = require('@nodeutils/defaults-deep');
const Protector = require('libp2p-pnet');
const DelegatedPeerRouter = require('libp2p-delegated-peer-routing');
const DelegatedContentRouter = require('libp2p-delegated-content-routing');

async function createPeerId() {
  return new Promise((resolve, reject) => {
    PeerId.create((err, id) => {
      if (err) return reject(id);
      resolve(id);
    });
  });
}

async function createPeerInfo(id: any) {
  return new PeerInfo(id);
}

async function createNode(_options: any) {
  const peerInfo = _options.peerInfo;
  const defaults = {
    // The libp2p modules for this libp2p bundle
    modules: {
      transport: [
        TCP,
        new WS(), // It can take instances too!
      ],
      streamMuxer: [SPDY, MPLEX],
      connEncryption: [SECIO],
      /** Encryption for private networks. Needs additional private key to work **/
      // connProtector: new Protector(/*protector specific opts*/),
      /** Enable custom content routers, such as delegated routing **/
      contentRouting: [new DelegatedContentRouter(peerInfo.id)],
      /** Enable custom peer routers, such as delegated routing **/
      peerRouting: [new DelegatedPeerRouter()],
      peerDiscovery: [MulticastDNS],
      dht: DHT, // DHT enables PeerRouting, ContentRouting and DHT itself components
    },

    // libp2p config options (typically found on a config.json)
    config: {
      // The config object is the part of the config that can go into a file, config.json.
      peerDiscovery: {
        mdns: {
          // mdns options
          interval: 1000, // ms
          enabled: true,
        },
        webrtcStar: {
          // webrtc-star options
          interval: 1000, // ms
          enabled: false,
        },
        // .. other discovery module options.
      },
      relay: {
        // Circuit Relay options
        enabled: true,
        hop: {
          enabled: false,
          active: false,
        },
      },
      dht: {
        kBucketSize: 20,
        enabledDiscovery: true, // Allows to disable discovery (enabled by default)
      },
      // Enable/Disable Experimental features
      EXPERIMENTAL: {
        // Experimental features ("behind a flag")
        pubsub: false,
        dht: false,
      },
    },
  };
  // overload any defaults of your bundle using https://github.com/nodeutils/defaults-deep
  let node = new libp2p(defaultsDeep(_options, defaults));
  return node;
}

async function startNode(node: any) {
  return new Promise((resolve, reject) => {
    node.start(err => {
      if (err) return reject(err);
      resolve();
    });
  });
}

let port = 10333;

async function bootstrap() {
  let peerId: any = await createPeerId();
  let peerInfo = await createPeerInfo(peerId);
  peerInfo.multiaddrs.add(`/ip4/0.0.0.0/tcp/${++port}`);
  let node: any = await createNode({ peerInfo });
  await startNode(node);
  node.on('peer:connect', peerInfo => {
    console.log(peerInfo.id.toB58String());
  });
  node.on('peer:discovery', peer => {
    console.log('peer:discovery', peer.id.toB58String());
  });
  node.on('peer:disconnect', peer => {
    console.log('peer:discovery');
  });
  node.handle('/chat/1.0.0', (protocol, conn) => {});
  //   console.log('Listener ready, listening on:');
  peerInfo.multiaddrs.forEach(ma => {
    // console.log(ma.toString() + '/ipfs/' + peerId.toB58String());
  });
}
bootstrap();
bootstrap();
bootstrap();
bootstrap();

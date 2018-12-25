import MulticastDNS = require('libp2p-mdns');
import PeerInfo = require('peer-info');
import multiaddr = require('multiaddr');
import { parallel, series } from 'async';
let pA, pB, pC, pD;
parallel(
  [
    cb => {
      PeerInfo.create((err, peer) => {
        pA = peer;
        pA.multiaddrs.add(multiaddr('/ip4/127.0.0.1/tcp/20001'));
        cb();
      });
    },
    cb => {
      PeerInfo.create((err, peer) => {
        pB = peer;
        pB.multiaddrs.add(multiaddr('/ip4/127.0.0.1/tcp/20002'));
        pB.multiaddrs.add(multiaddr('/ip6/::1/tcp/20002'));
        cb();
      });
    },
    cb => {
      PeerInfo.create((err, peer) => {
        pC = peer;
        pC.multiaddrs.add(multiaddr('/ip4/127.0.0.1/tcp/20003'));
        pC.multiaddrs.add(multiaddr('/ip4/127.0.0.1/tcp/30003/ws'));
        cb();
      });
    },
    cb => {
      PeerInfo.create((err, peer) => {
        if (err) {
          cb(err);
        }
        pD = peer;
        pD.multiaddrs.add(multiaddr('/ip4/127.0.0.1/tcp/30003/ws'));
        cb();
      });
    },
  ],
  () => {
    const mdnsA = new MulticastDNS({
      peerInfo: pA,
      port: 50004, // port must be the same
    });
    let id = 0;
    mdnsA.on('peer', peerInfo => {
      console.log(
        'Found a peer in the local network ' + id++,
        JSON.stringify(peerInfo),
      );
    });
    const mdnsB = new MulticastDNS({
      peerInfo: pB,
      port: 50004,
    });
    const mdnsC = new MulticastDNS({
      peerInfo: pC,
      port: 50004,
    });
    const mdnsD = new MulticastDNS({
      peerInfo: pD,
      port: 50004,
    });
    // Broadcast for 20 seconds
    series(
      [
        cb => mdnsB.start(cb),
        cb => mdnsC.start(cb),
        cb => mdnsD.start(cb),
        cb => mdnsA.start(cb),
      ],
      () => {},
    );
  },
);

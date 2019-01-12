const MDNS = require('libp2p-mdns');
const PeerInfo = require('peer-info');
const PeerId = require('peer-id');

const mdns = new MDNS({
  peerInfo: new PeerInfo(new PeerId({ bits: 32 })),
});

mdns.on('peer', peerInfo => {
  console.log('Found a peer in the local network', peerInfo.id.toB58String());
});

// Broadcast for 20 seconds
mdns.start(() => setTimeout(() => mdns.stop(() => {}), 20 * 1000));

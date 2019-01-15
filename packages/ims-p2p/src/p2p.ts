import { Injectable, PeerIdFactory, PeerInfoFactory } from 'ims-core';
import { P2pNodeFactory } from './p2p_node';
import {} from 'ims-p2p-switch'
@Injectable()
export class P2p {
  constructor(
    public peerId: PeerIdFactory,
    public peerInfo: PeerInfoFactory,
    public node: P2pNodeFactory,
  ) {}

  async stop() {}

  async listener() {
    let idListener = await this.peerId.createFromJSON(
      require('./peer-id-listener'),
    );
    const peerListener = this.peerInfo.create(idListener);
    peerListener.multiaddrs.add('/ip4/0.0.0.0/tcp/10333');
    const nodeListener = this.node.create({
      peerInfo: peerListener,
    });
    await nodeListener.start();
    nodeListener.on('peer:connect', peerInfo => {
      console.log(peerInfo.id.toB58String());
    });
    nodeListener.handle('/chat/1.0.0', (protocol, conn) => {
      console.log('handle');
    });
    peerListener.multiaddrs.forEach(ma => {
      console.log(ma.toString() + '/ipfs/' + idListener.toB58String());
    });
  }

  async start() {
    let dialer = await this.peerId.createFromJSON(require('./peer-id-dialer'));
    const peerDialer = this.peerInfo.create(dialer);
    peerDialer.multiaddrs.add('/ip4/0.0.0.0/tcp/0');
    const nodeDialer = this.node.create({
      peerInfo: peerDialer,
    });
    let listener = await this.peerId.createFromJSON(
      require('./peer-id-listener'),
    );
    const peerListener = this.peerInfo.create(listener);
    peerListener.multiaddrs.add('/ip4/127.0.0.1/tcp/10333');
    await nodeDialer.start();
    console.log('Dialer ready, listening on:');
    peerListener.multiaddrs.forEach(ma => {
      console.log(ma.toString() + '/ipfs/' + listener.toB58String());
    });
    let conn = await nodeDialer.dialProtocol(peerListener, '/chat/1.0.0');
    debugger;
    return conn;
  }
}

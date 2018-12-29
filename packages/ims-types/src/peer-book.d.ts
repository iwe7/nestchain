declare module 'peer-book' {
  import PeerInfo = require('peer-info');
  import PeerId = require('peer-id');
  class PeerBook {
    has(peer: string | Buffer | PeerInfo | PeerId): boolean;
    put(peerInfo: PeerInfo, replace): void;
    get(peer: string | Buffer | PeerInfo | PeerId): any;
    getAll(): { [key: string]: PeerInfo };
    getAllArray(): PeerInfo[];
    getMultiaddrs(peer: string | Buffer | PeerInfo | PeerId): any[];
    remove(peer: string | Buffer | PeerInfo | PeerId): void;
  }
}

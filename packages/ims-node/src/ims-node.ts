import multiaddr = require('multiaddr');

export class ImsNode {
  multiaddr: multiaddr.Multiaddr;
  constructor(address: string) {
    this.multiaddr = multiaddr(address);
  }
}

let node = new ImsNode('/ip4/120.0.0.1/tcp/1234');

debugger;

import IPFS = require('ipfs');
export class ImsIpfs {
  node: any;
  constructor(options?: any) {
    this.node = new IPFS(options);
  }

  id(fn: (err: Error, identify: any) => any) {
    return this.node.id(fn);
  }

  on(type: string, fn: (...args: any[]) => any) {
    return this.node.on(type, fn);
  }

  stop(fn: (err: Error) => any) {
    return this.node.stop(fn);
  }
}

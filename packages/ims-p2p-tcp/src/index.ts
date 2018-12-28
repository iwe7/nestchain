import net = require('net');
export class ImsP2pTcp {
  dial(ma, options, callback) {
    const socket = net.connect(null);
    socket.on('timeout', () => {});
    socket.on('error', () => {});
    socket.on('connect', () => {});
    socket.on('connect', () => {});
  }
  createListener(options, handler) {}
  filter(multiaddrs) {}
}

export class ImsP2pTcpObservable {}

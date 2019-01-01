import { MultiaddrResult } from '../visitor';
import net = require('net');
export function createTcpServer(
  options: MultiaddrResult,
) {
  let server = net.createServer(socket => {
    socket.setEncoding('utf8');
  });
  return server;
}

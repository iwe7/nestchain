/**
 * tcp
 */
import { toMulitaddr } from './util';
let addr = toMulitaddr('/ip4/127.0.0.1/udp/3000');
import net = require('net');
let server = net.createServer();

server.listen(addr.port, addr.host, () => {
  console.log(`tcp server start at ${addr.host}:${addr.port}`);
});

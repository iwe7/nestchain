import { MultiaddrResult } from '../visitor';
import net = require('net');
export function createTcpClient(options: MultiaddrResult) {
  return net.createConnection({
    port: options.port,
    host: options.host,
    family: options.family.code,
  });
}

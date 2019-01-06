import { ImsUdpServer } from './index';

new ImsUdpServer({
  port: 3001,
  host: '127.0.0.1',
  type: 'udp4',
});

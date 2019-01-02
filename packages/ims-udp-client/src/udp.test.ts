import { ImsUdpClient } from './index';

let client = new ImsUdpClient({
  type: 'udp4',
  port: 3001,
  address: '127.0.0.1',
});

client.send('test');

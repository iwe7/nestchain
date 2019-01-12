import { corePlatform } from 'ims-core';
import { DnsPacketModule, DnsPacket, IDnsPacketFlags } from 'ims-dns-packet';
import dgram = require('dgram');

corePlatform()
  .bootstrapModule(DnsPacketModule)
  .subscribe(res => {
    let dnsPacket = res.injector.get(DnsPacket);
    const socket = dgram.createSocket('udp4');
    const buf = dnsPacket.encode({
      type: 'query',
      id: 1,
      flags: IDnsPacketFlags.RECURSION_DESIRED,
      questions: [
        {
          type: 'A',
          name: 'meepo.com.cn',
        }
      ],
    });
    socket.on('message', (message: any) => {
      console.log(dnsPacket.decode(message)); // prints out a response from google dns
    });
    socket.on('close', () => {
      console.log('close');
    });
    socket.on('error', () => {
      console.log('error');
    });
    socket.on('listening', (...args: any[]) => {
      console.log('listening', args);
    });
    socket.send(buf, 0, buf.length, 53, '114.114.114.114');
  });

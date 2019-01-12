import dnsPacket = require('dns-packet');
import dgram = require('dgram');

const socket = dgram.createSocket('udp4');

const buf = dnsPacket.encode({
  type: 'query',
  id: 1,
  flags: dnsPacket.RECURSION_DESIRED,
  questions: [
    {
      type: 'A',
      class: 'IN',
      name: 'baidu.com',
    },
  ],
});

socket.on('message', message => {
  console.log(dnsPacket.decode(message)); // prints out a response from google dns
});

socket.send(buf, 0, buf.length, 55, '114.114.114.114');

import dnsPacket = require('dns-packet');
import { Injectable, NgModule } from 'ims-core';
export enum IDnsPacketFlags {
  RECURSION_DESIRED = dnsPacket.RECURSION_DESIRED,
  RECURSION_AVAILABLE = dnsPacket.RECURSION_AVAILABLE,
  TRUNCATED_RESPONSE = dnsPacket.TRUNCATED_RESPONSE,
  AUTHORITATIVE_ANSWER = dnsPacket.AUTHORITATIVE_ANSWER,
  AUTHENTIC_DATA = dnsPacket.AUTHENTIC_DATA,
  CHECKING_DISABLED = dnsPacket.CHECKING_DISABLED,
}
export type KClass = 'IN' | 'CS' | 'CH' | 'HS' | 'ANY';
export interface IDnsPacketQuestion {
  type: string;
  class: KClass;
  name: string;
  ttl: number;
}

export interface IDnsPacket {
  type?: 'query' | 'response';
  id?: any;
  flags?: IDnsPacketFlags;
  questions?: any[];
  answers?: any[];
  additionals?: any[];
  authorities?: any[];
}
@Injectable()
export class DnsPacket {
  encode(packet: IDnsPacket, buf?: Buffer, offset: number = 0) {
    return dnsPacket.encode(packet, buf, offset);
  }
  decode(packet: IDnsPacket, buf?: Buffer) {
    return dnsPacket.decode(packet, buf);
  }
  streamEncode(packet: IDnsPacket, buf?: Buffer, offset: number = 0) {
    return dnsPacket.streamEncode(packet, buf, offset);
  }
  streamDecode(packet: IDnsPacket, buf?: Buffer) {
    return dnsPacket.streamDecode(packet, buf);
  }
  encodingLength(packet: IDnsPacket) {
    return dnsPacket.encodingLength(packet);
  }
}

@NgModule({
  providers: [DnsPacket],
})
export class DnsPacketModule {}

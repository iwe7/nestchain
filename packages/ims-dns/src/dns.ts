import dnsPacket = require('dns-packet');
export const AUTHORITATIVE_ANSWER = 1 << 10;
export const TRUNCATED_RESPONSE = 1 << 9;
export const RECURSION_DESIRED = 1 << 8;
export const RECURSION_AVAILABLE = 1 << 7;
export const AUTHENTIC_DATA = 1 << 5;
export const CHECKING_DISABLED = 1 << 4;
export const DNSSEC_OK = 1 << 15;
export class ImsDns {
  static encode(result: any, buf?: Buffer, offset?: number) {
    return dnsPacket.encode(result, buf, offset);
  }
  static decode(buf: any, offset?: number) {
    return dnsPacket.decode(buf, offset);
  }
  static streamEncode(result: any) {
    return dnsPacket.streamEncode(result);
  }
  static sbufstreamDecode(sbuf: Buffer) {
    return dnsPacket.sbufstreamDecode(sbuf);
  }
}

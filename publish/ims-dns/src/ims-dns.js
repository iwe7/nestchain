"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dnsPacket = require("dns-packet");
exports.AUTHORITATIVE_ANSWER = 1 << 10;
exports.TRUNCATED_RESPONSE = 1 << 9;
exports.RECURSION_DESIRED = 1 << 8;
exports.RECURSION_AVAILABLE = 1 << 7;
exports.AUTHENTIC_DATA = 1 << 5;
exports.CHECKING_DISABLED = 1 << 4;
exports.DNSSEC_OK = 1 << 15;
class ImsDns {
    static encode(result, buf, offset) {
        return dnsPacket.encode(result, buf, offset);
    }
    static decode(buf, offset) {
        return dnsPacket.decode(buf, offset);
    }
    static streamEncode(result) {
        return dnsPacket.streamEncode(result);
    }
    static sbufstreamDecode(sbuf) {
        return dnsPacket.sbufstreamDecode(sbuf);
    }
}
exports.ImsDns = ImsDns;

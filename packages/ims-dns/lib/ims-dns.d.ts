/// <reference types="node" />
export declare const AUTHORITATIVE_ANSWER: number;
export declare const TRUNCATED_RESPONSE: number;
export declare const RECURSION_DESIRED: number;
export declare const RECURSION_AVAILABLE: number;
export declare const AUTHENTIC_DATA: number;
export declare const CHECKING_DISABLED: number;
export declare const DNSSEC_OK: number;
export declare class ImsDns {
    static encode(result: any, buf?: Buffer, offset?: number): any;
    static decode(buf: any, offset?: number): any;
    static streamEncode(result: any): any;
    static sbufstreamDecode(sbuf: Buffer): any;
}

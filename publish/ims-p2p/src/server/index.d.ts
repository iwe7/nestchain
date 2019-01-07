import { Observable } from 'rxjs';
export declare type IProtocolType = 'ip4' | 'tcp' | 'udp' | 'dccp' | 'ip6' | 'dns4' | 'dns6' | 'dnsaddr' | 'sctp' | 'utp' | 'p2p' | 'ipfs' | 'http' | 'https' | 'quic' | 'ws' | 'wss' | 'p2p-websocket-star' | 'p2p-webrtc-star' | 'p2p-webrtc-direct' | 'p2p-circuit';
export declare function bootstrap(address: string): Observable<{}>;

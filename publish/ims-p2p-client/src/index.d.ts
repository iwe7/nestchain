import { ImsHttpClient } from 'ims-http-client';
import { ImsWsClient } from 'ims-ws-client';
export declare class ImsP2pClient {
    http: ImsHttpClient;
    ws: ImsWsClient;
    constructor(host: string, port: number);
}

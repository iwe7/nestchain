import { ImsHttpClient } from 'ims-http-client';
import { ImsWsClient } from 'ims-ws-client';
export class ImsP2pClient {
  http: ImsHttpClient;
  ws: ImsWsClient;
  constructor(host: string, port: number) {
    this.http = new ImsHttpClient({
      host: host,
      port: port,
    });
    this.ws = new ImsWsClient({
      address: `ws://${host}:${port}`,
    });
  }
}

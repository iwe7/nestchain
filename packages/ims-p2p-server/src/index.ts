import { ImsHttpServer } from 'ims-http-server';
import { ImsWsServer } from 'ims-ws-server';
import { join } from 'path';
import { ROOT } from 'ims-const';
const json = require(join(ROOT, 'www/data/config.json'));
export class ImsP2pServer {
  http: ImsHttpServer;
  ws: ImsWsServer;
  constructor() {
    this.http = new ImsHttpServer({
      host: json.host,
      port: json.http,
    });
    this.ws = new ImsWsServer({
      server: this.http.server.server,
    });
  }
}

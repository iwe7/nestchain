import http = require('http');
import https = require('https');
import { URL } from 'url';
import { Observable } from 'ims-rxjs';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class Libp2pReloadNodejs {
  async create(url: any) {
    url = await this.parseUrl(url);
    return this.transportGet(url).toPromise();
  }

  private transportGet(url: URL): Observable<void> {
    return new Observable(obser => {
      const transport = url.protocol === 'https:' ? https : http;
      const req = transport.get(
        {
          hostname: url.hostname,
          port: url.port,
          path: url.pathname + url.search,
        },
        res => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            res.resume();
            return obser.error(new Error(`failed to preload ${url}`));
          }
          res.on('data', chunk => {});
          res.on('abort', () => {
            obser.error(new Error(`request aborted`));
          });
          res.on('error', err => {
            obser.error(err);
          });
          res.on('end', () => {
            obser.next();
            obser.complete();
          });
        },
      );
      req.on('error', err => {
        obser.error(err);
      });
      return () => req.abort();
    });
  }

  private async parseUrl(url: string): Promise<URL> {
    return new Promise((resolve, reject) => {
      try {
        resolve(new URL(url));
      } catch (err) {
        reject(err);
      }
    });
  }
}

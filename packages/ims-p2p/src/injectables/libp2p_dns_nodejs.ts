import dns = require('dns');

import { Injectable } from "ims-core";

@Injectable({
  providedIn: 'root',
})
export class Libp2pDnsNodejs {
  create(domain: string) {
    return new Promise((resolve, reject) => {
      dns.resolveTxt(domain, (err, records) => {
        if (err) {
          return reject(err);
        }
        for (const record of records) {
          if (record[0].startsWith('dnslink=')) {
            return resolve(record[0].substr(8, record[0].length - 1));
          }
        }
        return reject(new Error('domain does not have a txt dnslink entry'));
      });
    });
  }
}

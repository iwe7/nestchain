import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class Libp2pDnsBrowser {
  create(domain: string, opts: any = {}) {
    return new Promise((resolve, reject) => {
      domain = encodeURIComponent(domain);
      let url = `https://ipfs.io/api/v0/dns?arg=${domain}`;
      Object.keys(opts).forEach(prop => {
        url += `&${encodeURIComponent(prop)}=${encodeURIComponent(opts[prop])}`;
      });
      fetch(url, { mode: 'cors' })
        .then(response => {
          return response.json();
        })
        .then(response => {
          if (response.Path) {
            return resolve(response.Path);
          } else {
            return reject(new Error(response.Message));
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

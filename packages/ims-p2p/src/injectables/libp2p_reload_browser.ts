import { Injectable } from "ims-core";

@Injectable({
  providedIn: 'root',
})
export class Libp2pReloadBrowser {
  async create(url: any) {
    const controller = new AbortController();
    const signal = controller.signal;
    return fetch(url, { signal }).then(res => {
      if (!res.ok) {
        throw new Error(`failed to preload ${url}`);
      }
      return res.text();
    });
  }
}

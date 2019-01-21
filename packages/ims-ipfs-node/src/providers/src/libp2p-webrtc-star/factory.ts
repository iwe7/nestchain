import * as tokens from 'ims-ipfs';
import { Injector, isNullInjector } from 'ims-core';
import { ImsPromise } from 'ims-util';
export class Libp2pWebrtcStarFactory implements tokens.Libp2pWebrtcStarFactory {
  injector: Injector;
  constructor(injector: Injector) {
    this.injector = injector;
  }
  create(): Promise<tokens.Libp2pWebrtcStar> {
    let imsPromise = new ImsPromise<tokens.Libp2pWebrtcStar>();
    try {
      let WStar = this.injector.get(tokens.Libp2pWebrtcStar);
      let wrtc = this.injector.get(tokens.Wrtc);
      let electronWebRTC = this.injector.get(tokens.ElectronWebrtc);
      if (!(isNullInjector(wrtc) && isNullInjector(electronWebRTC))) {
        const wstar = new WStar({
          wrtc: isNullInjector(wrtc) ? wrtc : electronWebRTC,
        });
        imsPromise.next(wstar);
      } else {
        imsPromise.error(
          new Error(`can't found package wrtc or electron-webrtc`),
        );
      }
    } catch (e) {
      imsPromise.error(e);
    }
    return imsPromise.promise;
  }
}

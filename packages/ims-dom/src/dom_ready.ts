declare const document: Document & {
  attachEvent: any;
};

import { ImsRootStream } from 'ims-stream';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsDomReady {
  constructor(public rootStream: ImsRootStream) {}
  ready() {
    try {
      if (Reflect.has(document, 'addEventListener')) {
        document.addEventListener(
          'DOMContentLoaded',
          () => {
            this.rootStream.next({
              type: 'dom.ready',
              payload: undefined,
            });
          },
          false,
        );
      } else if (Reflect.has(document, 'attachEvent')) {
        document.attachEvent('onreadystatechange', () => {
          if (document.readyState === 'complete') {
            this.rootStream.next({
              type: 'dom.ready',
              payload: undefined,
            });
          }
        });
        let { documentElement } = document;
        if (Reflect.has(documentElement, 'doScroll') && window === window.top) {
          try {
            (documentElement as any).doScroll('left');
            this.rootStream.next({
              type: 'dom.ready',
              payload: undefined,
            });
          } catch (error) {
            this.rootStream.error(error);
          }
        }
      }
    } catch (e) {
      this.rootStream.error(e);
    }
  }
}

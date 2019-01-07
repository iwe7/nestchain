import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from 'ims-core';
import { Observable, Observer } from 'rxjs';

import { HttpBackend, HttpHandler } from './backend';
import { HttpRequest } from './request';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpResponse,
} from './response';
let nextRequestId: number = 0;

export const JSONP_ERR_NO_CALLBACK =
  'JSONP injected script did not invoke callback.';

export const JSONP_ERR_WRONG_METHOD =
  'JSONP requests must use JSONP request method.';
export const JSONP_ERR_WRONG_RESPONSE_TYPE =
  'JSONP requests must use Json response type.';

export abstract class JsonpCallbackContext {
  [key: string]: (data: any) => void;
}

@Injectable()
export class JsonpClientBackend implements HttpBackend {
  constructor(
    private callbackMap: JsonpCallbackContext,
    @Inject(DOCUMENT) private document: any,
  ) {}
  private nextCallback(): string {
    return `ng_jsonp_callback_${nextRequestId++}`;
  }
  handle(req: HttpRequest<never>): Observable<HttpEvent<any>> {
    if (req.method !== 'JSONP') {
      throw new Error(JSONP_ERR_WRONG_METHOD);
    } else if (req.responseType !== 'json') {
      throw new Error(JSONP_ERR_WRONG_RESPONSE_TYPE);
    }
    return new Observable<HttpEvent<any>>(
      (observer: Observer<HttpEvent<any>>) => {
        const callback = this.nextCallback();
        const url = req.urlWithParams.replace(
          /=JSONP_CALLBACK(&|$)/,
          `=${callback}$1`,
        );
        const node = this.document.createElement('script');
        node.src = url;
        let body: any | null = null;
        let finished: boolean = false;
        let cancelled: boolean = false;
        this.callbackMap[callback] = (data?: any) => {
          delete this.callbackMap[callback];
          if (cancelled) {
            return;
          }
          body = data;
          finished = true;
        };
        const cleanup = () => {
          if (node.parentNode) {
            node.parentNode.removeChild(node);
          }
          delete this.callbackMap[callback];
        };
        const onLoad = (event: Event) => {
          if (cancelled) {
            return;
          }
          cleanup();
          if (!finished) {
            observer.error(
              new HttpErrorResponse({
                url,
                status: 0,
                statusText: 'JSONP Error',
                error: new Error(JSONP_ERR_NO_CALLBACK),
              }),
            );
            return;
          }

          // Success. body either contains the response body or null if none was
          // returned.
          observer.next(
            new HttpResponse({
              body,
              status: 200,
              statusText: 'OK',
              url,
            }),
          );

          // Complete the stream, the response is over.
          observer.complete();
        };

        // onError() is the error callback, which runs if the script returned generates
        // a Javascript error. It emits the error via the Observable error channel as
        // a HttpErrorResponse.
        const onError: any = (error: Error) => {
          // If the request was already cancelled, no need to emit anything.
          if (cancelled) {
            return;
          }
          cleanup();

          // Wrap the error in a HttpErrorResponse.
          observer.error(
            new HttpErrorResponse({
              error,
              status: 0,
              statusText: 'JSONP Error',
              url,
            }),
          );
        };

        // Subscribe to both the success (load) and error events on the <script> tag,
        // and add it to the page.
        node.addEventListener('load', onLoad);
        node.addEventListener('error', onError);
        this.document.body.appendChild(node);

        // The request has now been successfully sent.
        observer.next({ type: HttpEventType.Sent });

        // Cancellation handler.
        return () => {
          // Track the cancellation so event listeners won't do anything even if already scheduled.
          cancelled = true;

          // Remove the event listeners so they won't run if the events later fire.
          node.removeEventListener('load', onLoad);
          node.removeEventListener('error', onError);

          // And finally, clean up the page.
          cleanup();
        };
      },
    );
  }
}

/**
 * An `HttpInterceptor` which identifies requests with the method JSONP and
 * shifts them to the `JsonpClientBackend`.
 *
 * @publicApi
 */
@Injectable()
export class JsonpInterceptor {
  constructor(private jsonp: JsonpClientBackend) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (req.method === 'JSONP') {
      return this.jsonp.handle(req as HttpRequest<never>);
    }
    // Fall through for normal HTTP requests.
    return next.handle(req);
  }
}

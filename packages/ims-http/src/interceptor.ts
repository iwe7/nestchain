import { Injectable, InjectionToken } from 'ims-core';
import { Observable } from 'rxjs';
import { HttpHandler } from './backend';
import { HttpRequest } from './request';
import { HttpEvent } from './response';

export interface HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>>;
}

/**
 * `HttpHandler` which applies an `HttpInterceptor` to an `HttpRequest`.
 *
 *
 */
export class HttpInterceptorHandler implements HttpHandler {
  constructor(
    private next: HttpHandler,
    private interceptor: HttpInterceptor,
  ) {}

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(req, this.next);
  }
}

/**
 * A multi-provider token which represents the array of `HttpInterceptor`s that
 * are registered.
 *
 * @publicApi
 */
export const HTTP_INTERCEPTORS = new InjectionToken<HttpInterceptor[]>(
  'HTTP_INTERCEPTORS',
);

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}

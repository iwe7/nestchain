import { Injectable, Injector, ModuleWithProviders, NgModule } from 'ims-core';
import { Observable } from 'ims-rxjs';

import { HttpBackend, HttpHandler } from './backend';
import { HttpClient } from './client';
import {
  HTTP_INTERCEPTORS,
  HttpInterceptor,
  HttpInterceptorHandler,
  NoopInterceptor,
} from './interceptor';
import { HttpRequest } from './request';
import { HttpEvent } from './response';
import {
  HttpXsrfCookieExtractor,
  HttpXsrfInterceptor,
  HttpXsrfTokenExtractor,
  XSRF_COOKIE_NAME,
  XSRF_HEADER_NAME,
} from './xsrf';

@Injectable()
export class HttpInterceptingHandler implements HttpHandler {
  private chain: HttpHandler | null = null;

  constructor(private backend: HttpBackend, private injector: Injector) {}

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (this.chain === null) {
      const interceptors = this.injector.get(HTTP_INTERCEPTORS, []);
      this.chain = interceptors.reduceRight(
        (next, interceptor) => new HttpInterceptorHandler(next, interceptor),
        this.backend,
      );
    }
    return this.chain.handle(req);
  }
}

export function interceptingHandler(
  backend: HttpBackend,
  interceptors: HttpInterceptor[] | null = [],
): HttpHandler {
  if (!interceptors) {
    return backend;
  }
  return interceptors.reduceRight(
    (next, interceptor) => new HttpInterceptorHandler(next, interceptor),
    backend,
  );
}

export function jsonpCallbackContext(): Object {
  if (typeof window === 'object') {
    return window;
  }
  return {};
}

@NgModule({
  providers: [
    HttpXsrfInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: HttpXsrfInterceptor,
      multi: true,
    },
    { provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor },
    { provide: XSRF_COOKIE_NAME, useValue: 'XSRF-TOKEN' },
    { provide: XSRF_HEADER_NAME, useValue: 'X-XSRF-TOKEN' },
  ],
})
export class HttpClientXsrfModule {
  static disable(): ModuleWithProviders<HttpClientXsrfModule> {
    return {
      ngModule: HttpClientXsrfModule,
      providers: [{ provide: HttpXsrfInterceptor, useClass: NoopInterceptor }],
    };
  }
  static withOptions(
    options: {
      cookieName?: string;
      headerName?: string;
    } = {},
  ): ModuleWithProviders<HttpClientXsrfModule> {
    return {
      ngModule: HttpClientXsrfModule,
      providers: [
        options.cookieName
          ? { provide: XSRF_COOKIE_NAME, useValue: options.cookieName }
          : [],
        options.headerName
          ? { provide: XSRF_HEADER_NAME, useValue: options.headerName }
          : [],
      ],
    };
  }
}

@NgModule({
  imports: [
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
  ],
  providers: [
    HttpClient,
    { provide: HttpHandler, useClass: HttpInterceptingHandler },
  ],
})
export class HttpClientModule {}

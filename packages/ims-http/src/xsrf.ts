import { parseCookieValue } from './cookie';
import {
  Inject,
  Injectable,
  InjectionToken,
  PLATFORM_ID,
  inject,
} from 'ims-core';
import { Observable } from 'rxjs';
import { HttpHandler } from './backend';
import { HttpInterceptor } from './interceptor';
import { HttpRequest } from './request';
import { HttpEvent } from './response';
export const XSRF_COOKIE_NAME = new InjectionToken<string>('XSRF_COOKIE_NAME');
export const XSRF_HEADER_NAME = new InjectionToken<string>('XSRF_HEADER_NAME');
export const COOKIE_TOKEN = new InjectionToken<string>('COOKIE_TOKEN');

export abstract class HttpXsrfTokenExtractor {
  abstract getToken(): string | null;
}

@Injectable()
export class HttpXsrfCookieExtractor implements HttpXsrfTokenExtractor {
  private lastCookieString: string = '';
  private lastToken: string | null = null;
  parseCount: number = 0;
  constructor(
    @Inject(PLATFORM_ID) private platform: string,
    @Inject(XSRF_COOKIE_NAME) private cookieName: string,
  ) {}

  getToken(): string | null {
    if (this.platform === 'server') {
      return null;
    }
    const cookieString = inject(COOKIE_TOKEN);
    if (cookieString !== this.lastCookieString) {
      this.parseCount++;
      this.lastToken = parseCookieValue(cookieString, this.cookieName);
      this.lastCookieString = cookieString;
    }
    return this.lastToken;
  }
}

@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: HttpXsrfTokenExtractor,
    @Inject(XSRF_HEADER_NAME) private headerName: string,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const lcUrl = req.url.toLowerCase();
    if (
      req.method === 'GET' ||
      req.method === 'HEAD' ||
      lcUrl.startsWith('http://') ||
      lcUrl.startsWith('https://')
    ) {
      return next.handle(req);
    }
    const token = this.tokenService.getToken();

    // Be careful not to overwrite an existing header of the same name.
    if (token !== null && !req.headers.has(this.headerName)) {
      req = req.clone({ headers: req.headers.set(this.headerName, token) });
    }
    return next.handle(req);
  }
}

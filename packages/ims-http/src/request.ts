import { HttpHeaders } from './headers';
import { HttpParams } from './params';

interface HttpRequestInit {
  headers?: HttpHeaders;
  reportProgress?: boolean;
  params?: HttpParams;
  responseType?: 'arraybuffer' | 'text';
  withCredentials?: boolean;
}

function mightHaveBody(method: string): boolean {
  switch (method) {
    case 'DELETE':
    case 'GET':
    case 'HEAD':
    case 'OPTIONS':
    case 'JSONP':
      return false;
    default:
      return true;
  }
}

function isArrayBuffer(value: any): value is ArrayBuffer {
  return typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer;
}

function isBlob(value: any): value is Blob {
  return typeof Blob !== 'undefined' && value instanceof Blob;
}

function isFormData(value: any): value is FormData {
  return typeof FormData !== 'undefined' && value instanceof FormData;
}

export class HttpRequest<T> {
  static baseUrl: string = '';
  readonly baseUrl: string = '';
  readonly body: T | null = null;
  // HttpHeaders
  readonly headers!: HttpHeaders;
  readonly reportProgress: boolean = false;
  readonly withCredentials: boolean = false;
  readonly responseType: 'arraybuffer' | 'text' = 'text';
  readonly method:
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT';
  readonly params!: HttpParams;
  readonly urlWithParams: string;
  constructor(
    method: 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS',
    url: string,
    init?: {
      headers?: HttpHeaders;
      reportProgress?: boolean;
      params?: HttpParams;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    },
  );
  constructor(
    method: 'POST' | 'PUT',
    url: string,
    body: T | null,
    init?: {
      headers?: HttpHeaders;
      reportProgress?: boolean;
      params?: HttpParams;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    },
  );
  constructor(
    method: 'POST' | 'PUT',
    url: string,
    body: T | null,
    init?: {
      headers?: HttpHeaders;
      reportProgress?: boolean;
      params?: HttpParams;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    },
  );
  constructor(
    method: string,
    readonly url: string,
    third?:
      | T
      | {
          headers?: HttpHeaders;
          reportProgress?: boolean;
          params?: HttpParams;
          responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
          withCredentials?: boolean;
        }
      | null,
    fourth?: {
      headers?: HttpHeaders;
      reportProgress?: boolean;
      params?: HttpParams;
      responseType?: 'arraybuffer' | 'text';
      withCredentials?: boolean;
    },
  ) {
    this.method = method.toUpperCase() as any;
    this.baseUrl = HttpRequest.baseUrl;
    let options: HttpRequestInit | undefined;
    if (mightHaveBody(this.method) || !!fourth) {
      this.body = third !== undefined ? (third as T) : null;
      options = fourth;
    } else {
      options = third as HttpRequestInit;
    }
    if (options) {
      this.reportProgress = !!options.reportProgress;
      this.withCredentials = !!options.withCredentials;
      if (!!options.responseType) {
        this.responseType = options.responseType;
      }
      if (!!options.headers) {
        this.headers = options.headers;
      }

      if (!!options.params) {
        this.params = options.params;
      }
    }
    if (!this.headers) {
      this.headers = new HttpHeaders();
    }
    if (!this.params) {
      this.params = new HttpParams();
      this.urlWithParams = `${
        HttpRequest.baseUrl ? HttpRequest.baseUrl : ''
      } + ${url}`;
    } else {
      const params = this.params.toString();
      if (params.length === 0) {
        this.urlWithParams = url;
      } else {
        const qIdx = url.indexOf('?');
        const sep: string =
          qIdx === -1 ? '?' : qIdx < url.length - 1 ? '&' : '';
        this.urlWithParams = url + sep + params;
      }
    }
  }

  serializeBody(): ArrayBuffer | Blob | FormData | string | null {
    if (this.body === null) {
      return null;
    }
    if (
      isArrayBuffer(this.body) ||
      isBlob(this.body) ||
      isFormData(this.body) ||
      typeof this.body === 'string'
    ) {
      return this.body;
    }
    if (this.body instanceof HttpParams) {
      return this.body.toString();
    }
    if (
      typeof this.body === 'object' ||
      typeof this.body === 'boolean' ||
      Array.isArray(this.body)
    ) {
      return JSON.stringify(this.body);
    }
    return (this.body as any).toString();
  }

  detectContentTypeHeader(): string | null {
    if (this.body === null) {
      return null;
    }
    if (isFormData(this.body)) {
      return null;
    }
    if (isBlob(this.body)) {
      return this.body.type || null;
    }
    if (isArrayBuffer(this.body)) {
      return null;
    }
    if (typeof this.body === 'string') {
      return 'text/plain';
    }
    if (this.body instanceof HttpParams) {
      return 'application/x-www-form-urlencoded;charset=UTF-8';
    }
    if (
      typeof this.body === 'object' ||
      typeof this.body === 'number' ||
      Array.isArray(this.body)
    ) {
      return 'application/json';
    }
    return null;
  }

  clone(): HttpRequest<T>;
  clone(update: {
    headers?: HttpHeaders;
    reportProgress?: boolean;
    params?: HttpParams;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
    body?: T | null;
    method?: string;
    url?: string;
    setHeaders?: { [name: string]: string | string[] };
    setParams?: { [param: string]: string };
  }): HttpRequest<T>;
  clone<V>(update: {
    headers?: HttpHeaders;
    reportProgress?: boolean;
    params?: HttpParams;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
    body?: V | null;
    method?: string;
    url?: string;
    setHeaders?: { [name: string]: string | string[] };
    setParams?: { [param: string]: string };
  }): HttpRequest<V>;
  clone(
    update: {
      headers?: HttpHeaders;
      reportProgress?: boolean;
      params?: HttpParams;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
      body?: any | null;
      method?: string;
      url?: string;
      setHeaders?: { [name: string]: string | string[] };
      setParams?: { [param: string]: string };
    } = {},
  ): HttpRequest<any> {
    const method: any = update.method || this.method;
    const url = update.url || this.url;
    const responseType = update.responseType || this.responseType;
    const body = update.body !== undefined ? update.body : this.body;
    const withCredentials =
      update.withCredentials !== undefined
        ? update.withCredentials
        : this.withCredentials;
    const reportProgress =
      update.reportProgress !== undefined
        ? update.reportProgress
        : this.reportProgress;
    let headers = update.headers || this.headers;
    let params = update.params || this.params;
    if (update.setHeaders !== undefined) {
      headers = Object.keys(update.setHeaders).reduce(
        (headers, name) => headers.set(name, update.setHeaders![name]),
        headers,
      );
    }
    if (update.setParams) {
      params = Object.keys(update.setParams).reduce(
        (params, param) => params.set(param, update.setParams![param]),
        params,
      );
    }
    return new HttpRequest(method, url, body, {
      params,
      headers,
      reportProgress,
      responseType,
      withCredentials,
    });
  }
}

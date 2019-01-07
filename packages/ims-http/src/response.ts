import { HttpHeaders } from './headers';
export enum HttpEventType {
  Sent,
  UploadProgress,
  ResponseHeader,
  DownloadProgress,
  Response,
  User,
}

export interface HttpProgressEvent {
  type: HttpEventType.DownloadProgress | HttpEventType.UploadProgress;
  loaded: number;
  total?: number;
}

export interface HttpDownloadProgressEvent extends HttpProgressEvent {
  type: HttpEventType.DownloadProgress;
  partialText?: string;
}

export interface HttpUploadProgressEvent extends HttpProgressEvent {
  type: HttpEventType.UploadProgress;
}

export interface HttpSentEvent {
  type: HttpEventType.Sent;
}

export interface HttpUserEvent<T> {
  type: HttpEventType.User;
}

export interface HttpJsonParseError {
  error: Error;
  text: string;
}

export type HttpEvent<T> =
  | HttpSentEvent
  | HttpHeaderResponse
  | HttpResponse<T>
  | HttpProgressEvent
  | HttpUserEvent<T>;

export abstract class HttpResponseBase {
  readonly headers: HttpHeaders;
  readonly status: number;
  readonly statusText: string;
  readonly url: string | null;
  readonly ok: boolean;
  readonly type!: HttpEventType.Response | HttpEventType.ResponseHeader;
  constructor(
    init: {
      headers?: HttpHeaders;
      status?: number;
      statusText?: string;
      url?: string;
    },
    defaultStatus: number = 200,
    defaultStatusText: string = 'OK',
  ) {
    this.headers = init.headers || new HttpHeaders();
    this.status = init.status !== undefined ? init.status : defaultStatus;
    this.statusText = init.statusText || defaultStatusText;
    this.url = init.url || null;
    this.ok = this.status >= 200 && this.status < 300;
  }
}

export class HttpHeaderResponse extends HttpResponseBase {
  constructor(
    init: {
      headers?: HttpHeaders;
      status?: number;
      statusText?: string;
      url?: string;
    } = {},
  ) {
    super(init);
  }

  readonly type: HttpEventType.ResponseHeader = HttpEventType.ResponseHeader;
  clone(
    update: {
      headers?: HttpHeaders;
      status?: number;
      statusText?: string;
      url?: string;
    } = {},
  ): HttpHeaderResponse {
    return new HttpHeaderResponse({
      headers: update.headers || this.headers,
      status: update.status !== undefined ? update.status : this.status,
      statusText: update.statusText || this.statusText,
      url: update.url || this.url || undefined,
    });
  }
}

export class HttpResponse<T> extends HttpResponseBase {
  readonly body: T | null;
  constructor(
    init: {
      body?: T | null;
      headers?: HttpHeaders;
      status?: number;
      statusText?: string;
      url?: string;
    } = {},
  ) {
    super(init);
    this.body = init.body !== undefined ? init.body : null;
  }

  readonly type: HttpEventType.Response = HttpEventType.Response;

  clone(): HttpResponse<T>;
  clone(update: {
    headers?: HttpHeaders;
    status?: number;
    statusText?: string;
    url?: string;
  }): HttpResponse<T>;
  clone<V>(update: {
    body?: V | null;
    headers?: HttpHeaders;
    status?: number;
    statusText?: string;
    url?: string;
  }): HttpResponse<V>;
  clone(
    update: {
      body?: any | null;
      headers?: HttpHeaders;
      status?: number;
      statusText?: string;
      url?: string;
    } = {},
  ): HttpResponse<any> {
    return new HttpResponse<any>({
      body: update.body !== undefined ? update.body : this.body,
      headers: update.headers || this.headers,
      status: update.status !== undefined ? update.status : this.status,
      statusText: update.statusText || this.statusText,
      url: update.url || this.url || undefined,
    });
  }
}

export class HttpErrorResponse extends HttpResponseBase implements Error {
  readonly name = 'HttpErrorResponse';
  readonly message: string;
  readonly error: any | null;
  readonly ok = false;

  constructor(init: {
    error?: any;
    headers?: HttpHeaders;
    status?: number;
    statusText?: string;
    url?: string;
  }) {
    super(init, 0, 'Unknown Error');
    if (this.status >= 200 && this.status < 300) {
      this.message = `Http failure during parsing for ${init.url ||
        '(unknown url)'}`;
    } else {
      this.message = `Http failure response for ${init.url ||
        '(unknown url)'}: ${init.status} ${init.statusText}`;
    }
    this.error = init.error || null;
  }
}

import { Observable } from 'ims-rxjs';
export abstract class Http {
  abstract get<T>(path: string): Observable<T>;
  abstract post<T>(path: string, body: any): Observable<T>;
}
export abstract class HttpConfig {
  baseURL?: string;
  timeout?: number;
}

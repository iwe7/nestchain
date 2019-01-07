import axios from 'axios';
import { Injectable } from '@angular/core';
import { HttpBackend, HttpEvent, HttpResponse, HttpRequest } from 'ims-http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
const varhttpAdapter = require('axios/lib/adapters/http');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

@Injectable()
export class HttpNodeBackend implements HttpBackend {
  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return from(
      axios.request({
        url: req.url,
        method: req.method,
        baseURL: req.baseUrl,
        timeout: 5000,
        withCredentials: req.withCredentials,
        adapter: varhttpAdapter,
        responseType: req.responseType,
        data: req.body,
        headers: req.headers,
        params: req.params,
        // doto
        onUploadProgress: () => {
          if (req.reportProgress) {
          }
        },
        // doto
        onDownloadProgress: () => {
          if (req.reportProgress) {
          }
        },
      }),
    ).pipe(
      map(res => {
        return new HttpResponse({
          body: res.data,
          headers: req.headers,
          status: res.status,
          statusText: res.statusText,
          url: req.url || undefined,
        });
      }),
    );
  }
}

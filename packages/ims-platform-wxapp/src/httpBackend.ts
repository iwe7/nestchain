import { Injectable } from 'ims-core';
import { HttpBackend, HttpEvent, HttpRequest, HttpResponse } from 'ims-http';
import { Observable } from 'ims-rxjs';

@Injectable()
export class HttpNodeBackend implements HttpBackend {
  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return new Observable(obser => {
      wx.request({
        url: req.url,
        data: req.body,
        header: req.headers,
        method: req.method,
        responseType: req.responseType,
        success: res => {
          obser.next(
            new HttpResponse({
              body: res.data,
              headers: req.headers,
              status: res.statusCode,
              statusText: res.errMsg,
              url: req.url || undefined,
            }),
          );
        },
      });
    });
  }
}

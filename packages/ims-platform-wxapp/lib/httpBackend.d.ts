import { HttpBackend, HttpEvent, HttpRequest } from 'ims-http';
import { Observable } from 'rxjs';
export declare class HttpNodeBackend implements HttpBackend {
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
}

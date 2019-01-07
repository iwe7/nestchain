import { HttpBackend, HttpRequest } from 'ims-http';
import { Observable } from 'rxjs';
import { HttpEvent } from 'ims-http';
export declare class HttpXhrBackend implements HttpBackend {
    constructor();
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
}

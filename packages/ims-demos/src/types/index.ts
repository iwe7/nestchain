import { Observable } from 'ims-rxjs';
export abstract class ImsDemo {
  abstract getIndex(name: string): Observable<any>;
  abstract getIndex2(name: string): Observable<any>;
}

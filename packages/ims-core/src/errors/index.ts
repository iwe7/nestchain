import { Injectable } from '../di/injectable';
import { Subject } from 'ims-rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorSubject<T extends Error> extends Subject<T> {}

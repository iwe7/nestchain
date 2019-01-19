import { BehaviorSubject } from 'ims-rxjs';
import { Injectable } from 'ims-core';
export interface RootStreamEvent<T = any> {
  type: string;
  payload: T;
}
@Injectable({
  providedIn: 'root',
})
export class ImsRootStream<T = any> extends BehaviorSubject<
  RootStreamEvent<T>
> {
  constructor() {
    super({
      type: 'init',
      payload: undefined,
    });
    this.subscribe(res => {
      console.log(res);
    });
  }
}

import { BehaviorSubject } from 'ims-rxjs';

export interface TypeEvent<T = any> {
  type?: 'init' | 'add' | 'delete' | 'update' | 'call';
  state?: 'start' | 'runing' | 'end';
  payload?: T;
}

let initState: TypeEvent = {
  type: 'init',
  state: 'start',
  payload: undefined,
};
export class LifeSubject<T = any> extends BehaviorSubject<TypeEvent<T>> {
  constructor() {
    super(initState);
  }
  next(val: TypeEvent<T>) {
    super.next({
      ...this.value,
      ...val,
    });
  }
}

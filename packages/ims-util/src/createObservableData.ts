import { Subject, Subscription } from 'ims-rxjs';

export interface EventData<T> {
  evetntName: string;
  object: T;
}

export interface PropertyChangeData<T> extends EventData<T> {
  propertyName?: string;
  value?: any;
  oldValue?: any;
}

export function createObservableData<T extends object>(
  source: T,
): T & {
  subscribe: (
    next?: (value: T) => void,
    error?: (error: any) => void,
    complete?: () => void,
  ) => Subscription;
  unsubscribe(): void;
} {
  let event: Subject<PropertyChangeData<T>> = new Subject();
  let subscription = new Subscription();
  return new Proxy(source, {
    get(target: T, p: PropertyKey, receiver: any): any {
      if (p === 'subscribe') {
        return (
          next?: (value: any) => void,
          error?: (error: any) => void,
          complete?: () => void,
        ) => {
          let subs = event.subscribe(
            next,
            e => {
              subscription.remove(subs);
              error(e);
            },
            () => {
              subscription.remove(subs);
              complete();
            },
          );
          subscription.add(subs);
        };
      } else if (p === 'complete') {
        return () => subscription.unsubscribe();
      }
      let _v = Reflect.get(target, p, receiver);
      if (_v && typeof _v === 'object') {
        let val = createObservableData(_v);
        subscription.add(
          val.subscribe(res => {
            event.next({
              ...res,
              object: source,
              propertyName: `${p as string}.${res.propertyName}`,
            });
          }),
        );
        return val;
      }
      return _v;
    },
    deleteProperty(target: T, p: PropertyKey): boolean {
      event.next({
        evetntName: 'drop',
        object: source,
        propertyName: p as string,
        value: null,
        oldValue: Reflect.get(target, p),
      });
      return Reflect.deleteProperty(target, p);
    },
    set(target: any, p: PropertyKey, value: any, receiver: any) {
      if (!Reflect.has(target, p)) {
        event.next({
          evetntName: 'add',
          object: source,
          propertyName: p as string,
          value: value,
          oldValue: null,
        });
        return Reflect.set(target, p, value, receiver);
      }
      let oldValue = Reflect.get(target, p);
      if (oldValue === value) {
        return false;
      }
      event.next({
        evetntName: 'update',
        object: this,
        propertyName: p as string,
        value: source,
        oldValue: oldValue,
      });
      return Reflect.set(target, p, value, receiver);
    },
  });
}

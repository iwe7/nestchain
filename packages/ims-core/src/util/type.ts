import { Symbol_observable } from 'ims-rxjs';
import { LifeSubject } from './life';

export const symbolNext = Symbol.for('ims symbol next');
export const symbolComplete = Symbol.for('ims symbol complete');
export const symbolError = Symbol.for('ims symbol error');
export const symbolMetadataDef = Symbol.for('ims symbol metadata def');
export function handlerObservable(p: PropertyKey, life: LifeSubject) {
  if (p === Symbol_observable) return () => life;
  if (p === symbolComplete) return () => life.complete();
  if (p === symbolNext) return (data: any) => life.next(data);
  if (p === symbolError) return (err: any) => life.error(err);
}

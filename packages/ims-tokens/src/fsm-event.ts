import { InjectionToken } from 'ims-core';
interface Event {
  [key: string]: string;
}
interface Events {
  [key: string]: Event;
}
interface FsmEventInstance {
  _state: string;
  (type: string): void;
  emit(type: string): void;
  on(type: string, callback: Function): void;
}
export interface FsmEvent {
  (start: string, events: Events): FsmEventInstance;
}
export const FsmEvent = new InjectionToken<FsmEvent>('FsmEvent');

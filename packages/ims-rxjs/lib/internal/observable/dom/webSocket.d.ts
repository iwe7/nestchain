import { WebSocketSubject, WebSocketSubjectConfig } from './WebSocketSubject';
export declare function webSocket<T>(urlConfigOrSource: string | WebSocketSubjectConfig<T>): WebSocketSubject<T>;

import { Subject, AnonymousSubject } from '../../Subject';
import { Subscriber } from '../../Subscriber';
import { Observable } from '../../Observable';
import { Subscription } from '../../Subscription';
import { Operator } from '../../Operator';
import { Observer, NextObserver } from '../../types';
export interface WebSocketSubjectConfig<T> {
    url: string;
    protocol?: string | Array<string>;
    resultSelector?: (e: MessageEvent) => T;
    serializer?: (value: T) => WebSocketMessage;
    deserializer?: (e: MessageEvent) => T;
    openObserver?: NextObserver<Event>;
    closeObserver?: NextObserver<CloseEvent>;
    closingObserver?: NextObserver<void>;
    WebSocketCtor?: {
        new (url: string, protocols?: string | string[]): WebSocket;
    };
    binaryType?: 'blob' | 'arraybuffer';
}
export declare type WebSocketMessage = string | ArrayBuffer | Blob | ArrayBufferView;
export declare class WebSocketSubject<T> extends AnonymousSubject<T> {
    private _config;
    _output: Subject<T>;
    private _socket;
    constructor(urlConfigOrSource: string | WebSocketSubjectConfig<T> | Observable<T>, destination?: Observer<T>);
    lift<R>(operator: Operator<T, R>): WebSocketSubject<R>;
    private _resetState;
    multiplex(subMsg: () => any, unsubMsg: () => any, messageFilter: (value: T) => boolean): Observable<any>;
    private _connectSocket;
    _subscribe(subscriber: Subscriber<T>): Subscription;
    unsubscribe(): void;
}

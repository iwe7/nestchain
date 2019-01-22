import { LifeSubject } from './life';
export declare const symbolNext: unique symbol;
export declare const symbolComplete: unique symbol;
export declare const symbolError: unique symbol;
export declare const symbolMetadataDef: unique symbol;
export declare function handlerObservable(p: PropertyKey, life: LifeSubject): (data: any) => void;

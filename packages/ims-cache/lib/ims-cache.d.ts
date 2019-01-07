import { Observable } from 'rxjs';
export declare enum ImsCacheModel {
    EX = "EX",
    PX = "PX",
    NX = "NX",
    XX = "XX"
}
export declare class ImsCache {
    static set(key: string, value: string, model: ImsCacheModel, duration: number): Observable<string>;
    static get(key: string): Observable<string>;
    static del(key: string): Observable<any>;
    static keys(pattern: string): Observable<string[]>;
    static clean(): Observable<boolean>;
}

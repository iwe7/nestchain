import { ImsBinBase } from '../base';
export declare class PackagesCommand extends ImsBinBase {
    name: string;
    match(s: string, ...args: any[]): boolean;
    run(): import("rxjs").Observable<any>;
}

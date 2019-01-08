import { ImsBinBase } from '../base';
export declare class CleanCommand extends ImsBinBase {
    name: string;
    match(s: string, ...args: any[]): boolean;
    run(): import("../../../ims-rxjs/lib").Observable<any>;
}

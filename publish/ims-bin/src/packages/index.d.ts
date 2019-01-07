import { ImsBinBase } from '../base';
export declare class PackagesCommand extends ImsBinBase {
    root: string;
    match(s: string, ...args: any[]): boolean;
    run(): Promise<any>;
}

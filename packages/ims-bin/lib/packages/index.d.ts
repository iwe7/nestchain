import { ImsBinBase } from '../base';
export declare class PackagesCommand extends ImsBinBase {
    match(s: string, ...args: any[]): boolean;
    run(): Promise<void>;
}

import { ImsBinBase } from '../base';
export declare class WxappCommand extends ImsBinBase {
    match(s: string, ...args: any[]): boolean;
    run(): Promise<void>;
}

import { ImsBinBase } from '../base';
export declare class BuildCommand extends ImsBinBase {
    type: string;
    name: string;
    platform: string;
    root: string;
    match(s: string, ...args: any[]): boolean;
    run(): void;
}

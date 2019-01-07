import levelup from 'levelup';
import { LevelDown } from 'leveldown';
import { ErrorCallback } from 'abstract-leveldown';
export declare class Level extends levelup {
    static db: LevelDown;
    constructor(options?: any, callback?: ErrorCallback);
    static destroy(location: string, cb: ErrorCallback): void;
    static repair(location: string, cb: ErrorCallback): void;
    static errors: any;
}
export default Level;

import execa = require('execa');
export declare function exec(command: string, args?: ReadonlyArray<string>, opts?: Options): any;
export declare function execSync(command: string, args?: ReadonlyArray<string>, opts?: execa.SyncOptions): string;
export declare function spawn(command: string, args?: ReadonlyArray<string>, opts?: Options): any;
export declare function spawnStreaming(command: string, args?: ReadonlyArray<string>, opts?: Options, prefix?: string): any;
export declare function getChildProcessCount(): number;
interface Options extends execa.Options {
    pkg?: string;
}
export {};

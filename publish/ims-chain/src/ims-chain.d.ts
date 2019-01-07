export declare const ROOT: string;
export declare const DATA_PATH: string;
export declare const CORE_DB_PATH: string;
export declare const INSTALL_LOCK: string;
export declare const DEFAULT_PRIVATE_KEY: string;
export declare const coreDb: any;
export declare function createPeerId(bits?: number): import("rxjs").Observable<any>;
export declare function checkInstalled(): Promise<any>;
export declare function savePeer(p: string, data: any): Promise<void>;

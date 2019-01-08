/// <reference types="node" />
import { Observable } from 'ims-rxjs';
export declare const ts: (src: string | string[], dest: string, dev?: boolean) => {
    run: () => Observable<{}>;
    watch: () => import("fs").FSWatcher;
};
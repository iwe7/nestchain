/// <reference types="node" />
import { Observable } from 'rxjs';
export declare const ts: (src: string | string[], dest: string) => {
    run: () => Observable<{}>;
    watch: () => import("fs").FSWatcher;
};

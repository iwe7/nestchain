/// <reference types="node" />
import { Observable } from 'ims-rxjs';
export declare const scss: (src: string | string[], dest: string) => {
    run: () => Observable<{}>;
    watch: () => import("fs").FSWatcher;
};

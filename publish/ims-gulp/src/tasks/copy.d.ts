/// <reference types="node" />
export declare const copy: (src: string | string[], dest: string) => {
    run: () => import("rxjs").Observable<any>;
    watch: () => import("fs").FSWatcher;
};

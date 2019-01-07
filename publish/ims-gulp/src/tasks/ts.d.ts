/// <reference types="node" />
export declare const ts: (src: string | string[], dest: string) => {
    run: () => NodeJS.ReadWriteStream;
    watch: () => import("fs").FSWatcher;
};

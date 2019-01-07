/// <reference types="node" />
export declare const scss: (src: string | string[], dest: string) => {
    run: () => NodeJS.ReadWriteStream;
    watch: () => import("fs").FSWatcher;
};

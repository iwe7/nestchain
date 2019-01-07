/// <reference types="node" />
export declare const image: (src: string, dest: string) => {
    run: () => NodeJS.ReadWriteStream;
    watch: () => import("fs").FSWatcher;
};

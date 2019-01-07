/// <reference types="node" />
export declare const copy: (src: string, dest: string) => {
    run: () => void;
    watch: () => import("fs").FSWatcher;
};

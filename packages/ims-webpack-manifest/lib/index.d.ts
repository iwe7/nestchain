export declare function getWebapckDll(dll: string, platform: string): {
    entry: {
        react: string[];
        polyfill: string[];
        socket: string[];
        rxjs: string[];
        ramda: string[];
    };
    output: {
        filename: string;
        path: string;
        library: string;
    };
    resolve: {
        mainFields: string[];
        alias: {
            'ims-*': string;
        };
    };
    plugins: any[];
};
export default getWebapckDll;

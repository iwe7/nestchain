declare global {
    interface SymbolConstructor {
        readonly observable: symbol;
    }
}
export declare const observable: symbol | string;

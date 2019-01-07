export declare class ImsWeb {
    version: any;
    net: any;
    eth: any;
    db: any;
    readonly isConnected: boolean;
    setProvider(): void;
    currentProvider(): void;
    reset(): void;
    sha3(): void;
    toHex(): void;
    toAscii(): void;
    fromAscii(): void;
    toDecimal(): void;
    fromDecimal(): void;
    fromWei(): void;
    toWei(): void;
    toBigNumber(): void;
}

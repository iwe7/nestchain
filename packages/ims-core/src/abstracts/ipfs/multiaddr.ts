export interface MultiaddrProto {
  code?: number;
  size?: number;
  name?: string;
}
export interface MultiaddrOptions {
  family?: number;
  host?: string;
  port?: number;
  transport?: string;
}
export abstract class Multiaddr {
  abstract protos(): MultiaddrProto[];
  abstract toOptions(): MultiaddrOptions;
  abstract fromStupidString(str: string): void;
  abstract isThinWaistAddress(addr: any): boolean;
  abstract nodeAddress(): MultiaddrOptions;
  abstract equals(addr: Multiaddr): boolean;
  abstract getPeerId(): string;
  abstract decapsulate(addr): any;
  abstract encapsulate(addr): any;
  abstract stringTuples(): any;
  abstract tuples(): any;
  abstract protoNames(): any;
  abstract protoCodes(): any;
  abstract inspect(): string;
  abstract toString(): string;
}
export abstract class MultiaddrFactory {
  abstract resolve(addr): Promise<void>;
  abstract isName(): boolean;
  abstract isMultiaddr(val: any): val is Multiaddr;
  abstract fromNodeAddress(
    addr: MultiaddrOptions,
    transport: string,
  ): Multiaddr;
  abstract create(): Multiaddr;
}

export abstract class IpfsRepo {
  abstract init(config): Promise<any>;
  abstract open(): Promise<any>;
  abstract close(): Promise<any>;
  abstract exists(): Promise<any>;
  abstract stat(opt): Promise<any>;
}

export abstract class IpfsRepo {
  closed: boolean;
  abstract init(config): Promise<any>;
  abstract open(): Promise<any>;
  abstract close(): Promise<any>;
  abstract exists(): Promise<any>;
  abstract stat(opt): Promise<any>;
}

export abstract class IpfsRepoFactory {
  repoVersion: any;
  errors: any;
  abstract create(path: string): IpfsRepo;
}

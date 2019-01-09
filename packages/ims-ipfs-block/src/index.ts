import {
  IpfsBlockFactory,
  IpfsBlock,
  CidFactory,
  Injector,
  StaticProvider,
} from 'ims-core';

export class IpfsBlockFactoryImpl extends IpfsBlockFactory {
  constructor(private injector: Injector) {
    super();
  }
  create(data: Buffer): IpfsBlock {
    let fac = this.injector.get(CidFactory) as CidFactory;
    let cid = fac.create(data);
    return new IpfsBlock(data, cid);
  }
}

export const ImsIpsBlockProviders: StaticProvider[] = [
  {
    provide: IpfsBlockFactory,
    useFactory: (injector: Injector) => {
      console.log(injector);
      return new IpfsBlockFactoryImpl(injector);
    },
    deps: [Injector],
  },
];

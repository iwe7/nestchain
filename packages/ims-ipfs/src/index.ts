import { Ipfs, IpfsFactory, IpfsOptions } from 'ims-core';
import { StaticProvider, Injector } from '@angular/core';
export class IpfsImpl extends Ipfs {
  init(): any {}
  preStart(): any {}
  start(): any {}
  stop(): any {}
  isOnline(): boolean {
    return true;
  }
  id(): any {}
  ping(): any {}
  pingPullStream(): any {}
  pingReadableStream(): any {}
  version(): any {}
}
export class IpfsFactoryImpl extends IpfsFactory {
  constructor(private injector: Injector) {
    super();
  }
  create(options: IpfsOptions): Ipfs {
    return new IpfsImpl();
  }
}
export const imsIpfsProviders: StaticProvider[] = [
  {
    provide: IpfsFactory,
    useFactory: (injector: Injector) => {
      return new IpfsFactoryImpl(injector);
    },
    deps: [Injector],
  },
];

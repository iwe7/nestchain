import { IpfsBlock, CidFactory, Injector, Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class IpfsBlockFactory {
  constructor(private injector: Injector) {}
  create(data: Buffer): IpfsBlock {
    let fac = this.injector.get(CidFactory) as CidFactory;
    let cid = fac.create(data);
    return new IpfsBlock(data, cid);
  }
}

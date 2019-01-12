import { NgModule, Injector } from 'ims-core';
import { Dns, DnsOptions } from './dns';
import { DnsPacketModule, DnsPacket } from 'ims-dns-packet';

@NgModule({
  providers: [
    {
      provide: Dns,
      useFactory: (injector: Injector) => {
        let opts: DnsOptions = {};
        let packet = injector.get(DnsPacket);
        return new Dns(opts, packet);
      },
      deps: [Injector],
    },
  ],
  imports: [DnsPacketModule],
})
export class DnsModule {}

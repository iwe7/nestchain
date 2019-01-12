import { DnsModule } from './index';
import { corePlatform } from 'ims-core';
import { Dns } from './dns';

corePlatform()
  .bootstrapModule(DnsModule)
  .subscribe(async res => {
    let injector = res.injector;
    let dns = injector.get<Dns>(Dns);
    dns.on('query', query => {
      console.log('got a query packet:', query);
    });
    dns.on('response', response => {
      console.log('got a response packet:', response);
    });
    let query = await dns.query({
      questions: [
        {
          name: 'baidu.com',
          type: 'A',
        },
      ],
    });
  });

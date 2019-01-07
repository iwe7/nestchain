# `ims-udp-client`

> Udp 客户端

```ts
import { ImsUdpClient } from 'ims-udp-client';
let client = new ImsUdpClient({
  type: 'udp4',
  port: 3001,
  address: '127.0.0.1',
});
client.send('test');
```

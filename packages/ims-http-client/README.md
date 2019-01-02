# `ims-http-client`

> Http客户端

```ts
import { ImsHttpClient } from 'ims-http-client';
let client = new ImsHttpClient({
  port: 8088,
  host: '127.0.0.1',
});
client.get('/demo').then(res => console.log(res));
```

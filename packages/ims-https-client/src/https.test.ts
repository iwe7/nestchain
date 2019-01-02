import { ImsHttpsClient } from 'ims-https-client';

let client = new ImsHttpsClient({
  port: 3003,
  host: '127.0.0.1',
});

client
  .get('/demo')
  .then(res => {
    console.log(res);
    debugger;
  })
  .catch(err => {
    console.log(err);
  });

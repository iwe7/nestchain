import { WebSocketServerSubject } from './WebSocketServerSubject';
import { WebSocketClientSubject } from './WebSocketClientSubject';
import { filter, map, switchMapTo } from 'ims-rxjs/operators';
import { Subscription } from 'ims-rxjs';

let web = new WebSocketServerSubject({
  port: 3000,
});
let client = new WebSocketClientSubject('ws://127.0.0.1:3000');

let subscription = new Subscription();
web
  .pipe(
    filter(res => res.type === 'connection'),
    map(res => res.payload[0]),
  )
  .subscribe(res => {
    subscription.add(res.subscribe());
  });

client.subscribe(res => {
  console.log('client', res);
});

setInterval(async () => {
  await client.send('test');
}, 1000);

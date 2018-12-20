# domain

> Node.js Domain(域) 简化异步代码的异常处理，可以捕捉处理 try catch 无法捕捉的异常。

```ts
import { create } from 'domain';

const d = create();

const emit = (type: any, data: any) => process.emit(type, data);

d.on('error', err => {
  emit('cleanup', err);
});

d.run(() => {
  // todo
});

process.on('uncaughtException', err => {
  emit('cleanup', err);
});

process.on('unhandledRejection', err => {
  emit('cleanup', err);
});

process.on('unhandledRejection', err => {
  emit('cleanup', err);
});
```

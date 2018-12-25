# 概述

# callback

通过回调函数实现异步数据流操作，如果是复杂的异步嵌套，会让人疯狂。极度耗损心力。

```ts
setTimeout(() => {
  console.log('1000');
}, 1000);
```

# promise

Promise 的出现一定，大大优化了异步操作中回调函数的问题

```ts
// 定义
let timeout = (timeLen: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, timeLen);
  });
// 使用简化
timeout(1000).then(() => {
  console.log('1000');
});
```

# async/await

async/await 使异步调用更简洁，更清晰刻度

```ts
async function bootstrap() {
  await timeout(1000);
  console.log('1000');
}
```

# rxjs

rxjs 是微软开源的异步数据流操作框架，通过一百多种操作符简化异步数据流操作。
但是 rxjs 并没有简化回调操作，他的优点是提供更加灵活控制异步操作的方法。
并很好地兼容了 Promise. rxjs 真正强大方便的地方就是操作符。

```ts
// 通过操作符操作/控制流
from(timeout(1000)).subscribe(() => {
  console.log('1000');
});
```

上手难度大。

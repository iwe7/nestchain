# 实战

- 增加源头、减少源头
- 分流
- 截流

- [express](#express)

# express
```ts
import express = require('express');
let app = express();
// express可以看成一个由请求req,响应res组成的数据流
app.all('*', (req, res, next) => {
  /**
   * req请求
   * res响应
   * next下一个
   */
});
// 监听客户端发来的数据
app.listen(80);
```

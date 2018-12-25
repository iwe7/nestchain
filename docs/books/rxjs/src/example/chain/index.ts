import { Subject } from 'rxjs';
let privateKey = '';
let publicKey = '';

export class Chain<T> extends Subject<T> {
  next(value: T) {
    // 签名
  }
  // 确认
  confirm(value: T) {}
}

// 每个节点
let app = new Subject();
// next发射数据
// 验证数据是否被修改，验证通过发送
app.next();

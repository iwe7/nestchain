import { Router } from 'ims-grpc';

@Router()
export class User {
  /**
   * todo
   * 注册
   */
  @Router()
  register(call, callback) {
    //
    callback(null, {});
  }

  /**
   * todo
   * 登录
   */
  @Router()
  login() {}
  /**
   * todo
   * 退出登录
   */
  @Router()
  logout() {}
  /**
   * todo
   * 忘记密码
   */
  @Router()
  forget() {}
}

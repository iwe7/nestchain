import { ImsAccount } from './account';
import axios, { AxiosResponse } from 'axios';
import { from, Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
export enum WeixinDomain {
  api = 'api.weixin.qq.com',
  api2 = 'api2.weixin.qq.com',
  shApi = 'sh.api.weixin.qq.com',
  szApi = 'sz.api.weixin.qq.com',
  hkApi = 'hk.api.weixin.qq.com',
}

export const WeixinApi = {
  getAccessToken: `https://${WeixinDomain.api}/cgi-bin/token`,
};

export interface IGetAccessTokenResponse {
  access_token: string;
  expires_in: number;
}

export class WeixinAccount extends ImsAccount {
  appId: string;
  secret: string;
  constructor(accountId: string) {
    super(accountId);
    this.appId = 'wx6e41c8b66a4a3cf1';
    this.secret = 'ce880a22e3d411e4ee79b62ab187dcfe';
  }
  /**
   * 系统对来自微信公众平台请求的安全校验
   */
  public checkSign() {}
  /**
   * 验证签名是否合法
   */
  public checkSignature() {}
  /**
   * 生成签名并对消息进行加密
   */
  public encryptMsg() {}
  /**
   * 检验签名并对消息进行解密
   */
  public decryptMsg() {}
  /**
   * 获取当前公众号的AccessToken
   */

  public getAccessToken(): Observable<AxiosResponse<IGetAccessTokenResponse>> {
    return from(
      axios.get<IGetAccessTokenResponse>(`${WeixinApi.getAccessToken}`, {
        params: {
          grant_type: 'client_credential',
          appid: this.appId,
          secret: this.secret,
        },
      }),
    );
  }
  /**
   * 获取当前公众号的AccessToken
   */
  public getVailableAccessToken() {}
  /**
   * 获取 jsapi_ticket
   */
  public getJsApiTicket() {}
  /**
   * 获取 jssdk config
   */
  public getJssdkConfig() {}

  /**
   *
   */
  public getOauthUserInfo(accesstoken: string, openid: string) {}
  /**
   *
   */
  public getOauthInfo(code: string) {}

  /**
   *
   */
  public getOauthAccessToken() {}

  /**
   *
   */
  public fansQueryInfo() {}
}

let account = new WeixinAccount('');
account.getAccessToken().subscribe(res => {
  debugger;
});

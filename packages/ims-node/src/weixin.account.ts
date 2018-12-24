import { ImsAccount } from './account';
import axios, { AxiosResponse } from 'axios';
import { from, Observable, of } from 'rxjs';
import { pluck, tap, filter, switchMap, map } from 'rxjs/operators';
import { ImsCache, ImsCacheModel } from 'ims-cache';
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
  errcode?: number;
  errmsg?: string;
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
   * 并把结果保存在redis缓存中
   */
  get accessTokenKey() {
    return `${this.appId}:AccessToken`;
  }
  public getAccessToken(): Observable<string> {
    // 检查appid和secret
    let check = new Observable(obs => {
      if (!this.appId || !this.secret) {
        obs.error(new Error(`未填写公众号的 appid 或 appsecret！`));
      }
      obs.next();
      obs.complete();
    });
    // 获取新的AccessToken
    let get: Observable<string> = from(
      axios.get<IGetAccessTokenResponse>(`${WeixinApi.getAccessToken}`, {
        params: {
          grant_type: 'client_credential',
          appid: this.appId,
          secret: this.secret,
        },
      }),
    ).pipe(
      switchMap(res => {
        let data = res.data;
        if (data.errcode === -1) {
          throw new Error('系统繁忙，此时请开发者稍候再试');
        } else if (data.errcode === 40001) {
          throw new Error(
            'AppSecret错误或者AppSecret不属于这个公众号，请开发者确认AppSecret的正确性',
          );
        } else if (data.errcode === 40002) {
          throw new Error('请确保grant_type字段值为client_credential');
        } else if (data.errcode === 40164) {
          throw new Error(
            '调用接口的IP地址不在白名单中，请在接口IP白名单中进行设置。（小程序及小游戏调用不要求IP地址在白名单内。）',
          );
        } else {
          return ImsCache.set(
            this.accessTokenKey,
            data.access_token,
            ImsCacheModel.EX,
            data.expires_in,
          );
        }
      }),
    );
    // 检查原来的AccessToken是否有效
    return check.pipe(
      switchMap(() => {
        return ImsCache.get(this.accessTokenKey).pipe(
          switchMap(res => {
            if (!res) {
              return get;
            } else {
              return of(res);
            }
          }),
        );
      }),
    );
  }
  /**
   * 获取当前公众号的AccessToken
   */
  public getVailableAccessToken() {
    return this.getAccessToken();
  }

  public clearAccessToken() {
    return ImsCache.del(this.accessTokenKey);
  }
  /**
   * 获取 jsapi_ticketP
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

import axios from 'axios';
import { from, Observable, of } from 'rxjs';
import { stringify } from 'qs';
import { tap, switchMap } from 'rxjs/operators';
import express = require('express');
import { ImsCache, ImsCacheModel } from 'ims-cache';

export enum WeixinDomain {
  api = 'api.weixin.qq.com',
  api2 = 'api2.weixin.qq.com',
  shApi = 'sh.api.weixin.qq.com',
  szApi = 'sz.api.weixin.qq.com',
  hkApi = 'hk.api.weixin.qq.com',
  open = 'open.weixin.qq.com',
}

export const WeixinApi = {
  getCode: `https://${WeixinDomain.open}/connect/oauth2/authorize`,
  getAccessToken: `https://${WeixinDomain.api}/cgi-bin/token`,
  getOpenid: `https://${WeixinDomain.api}/cgi-bin/user/info/batchget`,
};

export interface IGetAccessTokenResponse {
  access_token: string;
  expires_in: number;
  errcode?: number;
  errmsg?: string;
}

export interface IGetOpenidResponse {}

export class WeixinAccount {
  appId: string;
  secret: string;
  // 回调地址
  redirectUri: string = '';
  constructor(accountId: string) {
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

  /**
   * 获取新的
   */
  public getNewAccessToken() {
    return from(
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
  }
  /**
   * 检查缓存
   */
  public getAccessToken(): Observable<string> {
    // 检查appid和secret
    return ImsCache.get(this.accessTokenKey).pipe(
      tap(res => console.log(res)),
      switchMap(res => {
        if (!res) {
          // 获取新的AccessToken
          return this.getNewAccessToken();
        } else {
          return of(res);
        }
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
  public getCode(scope: 'snsapi_userinfo' | 'snsapi_base', state: string) {
    return `${WeixinApi.getCode}?${stringify({
      appid: this.appId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      scope: scope,
      state: state,
    })}#wechat_redirect`;
  }

  public getOpenid() {
    return from(axios.get(this.getCode('snsapi_base', 'state'))).pipe();
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

let weixin = new WeixinAccount('');
let app = express();
import { join } from 'path';
app.use(express.static(join(__dirname, 'public')));
app.get('*', async (req, res, next) => {
  res.send('hello');
  res.end();
});
app.listen(80, '0.0.0.0');

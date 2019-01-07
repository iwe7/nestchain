import { ImsAccount } from './account';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
export declare enum WeixinDomain {
    api = "api.weixin.qq.com",
    api2 = "api2.weixin.qq.com",
    shApi = "sh.api.weixin.qq.com",
    szApi = "sz.api.weixin.qq.com",
    hkApi = "hk.api.weixin.qq.com",
    open = "open.weixin.qq.com"
}
export declare const WeixinApi: {
    getCode: string;
    getAccessToken: string;
    getOpenid: string;
};
export interface IGetAccessTokenResponse {
    access_token: string;
    expires_in: number;
    errcode?: number;
    errmsg?: string;
}
export interface IGetOpenidResponse {
}
export declare class WeixinAccount extends ImsAccount {
    appId: string;
    secret: string;
    redirectUri: string;
    constructor(accountId: string);
    checkSign(): void;
    checkSignature(): void;
    encryptMsg(): void;
    decryptMsg(): void;
    readonly accessTokenKey: string;
    getNewAccessToken(): Observable<string>;
    getAccessToken(): Observable<string>;
    getVailableAccessToken(): Observable<string>;
    clearAccessToken(): Observable<any>;
    getCode(scope: 'snsapi_userinfo' | 'snsapi_base', state: string): string;
    getOpenid(): Observable<AxiosResponse<any>>;
    getJsApiTicket(): void;
    getJssdkConfig(): void;
    getOauthUserInfo(accesstoken: string, openid: string): void;
    getOauthInfo(code: string): void;
    getOauthAccessToken(): void;
    fansQueryInfo(): void;
}

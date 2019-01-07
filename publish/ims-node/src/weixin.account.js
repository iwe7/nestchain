"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_1 = require("./account");
const axios_1 = require("axios");
const rxjs_1 = require("rxjs");
const qs_1 = require("qs");
const operators_1 = require("rxjs/operators");
const express = require("express");
const ims_cache_1 = require("ims-cache");
var WeixinDomain;
(function (WeixinDomain) {
    WeixinDomain["api"] = "api.weixin.qq.com";
    WeixinDomain["api2"] = "api2.weixin.qq.com";
    WeixinDomain["shApi"] = "sh.api.weixin.qq.com";
    WeixinDomain["szApi"] = "sz.api.weixin.qq.com";
    WeixinDomain["hkApi"] = "hk.api.weixin.qq.com";
    WeixinDomain["open"] = "open.weixin.qq.com";
})(WeixinDomain = exports.WeixinDomain || (exports.WeixinDomain = {}));
exports.WeixinApi = {
    getCode: `https://${WeixinDomain.open}/connect/oauth2/authorize`,
    getAccessToken: `https://${WeixinDomain.api}/cgi-bin/token`,
    getOpenid: `https://${WeixinDomain.api}/cgi-bin/user/info/batchget`,
};
class WeixinAccount extends account_1.ImsAccount {
    constructor(accountId) {
        super(accountId);
        this.redirectUri = '';
        this.appId = 'wx6e41c8b66a4a3cf1';
        this.secret = 'ce880a22e3d411e4ee79b62ab187dcfe';
    }
    checkSign() { }
    checkSignature() { }
    encryptMsg() { }
    decryptMsg() { }
    get accessTokenKey() {
        return `${this.appId}:AccessToken`;
    }
    getNewAccessToken() {
        return rxjs_1.from(axios_1.default.get(`${exports.WeixinApi.getAccessToken}`, {
            params: {
                grant_type: 'client_credential',
                appid: this.appId,
                secret: this.secret,
            },
        })).pipe(operators_1.switchMap(res => {
            let data = res.data;
            if (data.errcode === -1) {
                throw new Error('系统繁忙，此时请开发者稍候再试');
            }
            else if (data.errcode === 40001) {
                throw new Error('AppSecret错误或者AppSecret不属于这个公众号，请开发者确认AppSecret的正确性');
            }
            else if (data.errcode === 40002) {
                throw new Error('请确保grant_type字段值为client_credential');
            }
            else if (data.errcode === 40164) {
                throw new Error('调用接口的IP地址不在白名单中，请在接口IP白名单中进行设置。（小程序及小游戏调用不要求IP地址在白名单内。）');
            }
            else {
                return ims_cache_1.ImsCache.set(this.accessTokenKey, data.access_token, ims_cache_1.ImsCacheModel.EX, data.expires_in);
            }
        }));
    }
    getAccessToken() {
        return ims_cache_1.ImsCache.get(this.accessTokenKey).pipe(operators_1.tap(res => console.log(res)), operators_1.switchMap(res => {
            if (!res) {
                return this.getNewAccessToken();
            }
            else {
                return rxjs_1.of(res);
            }
        }));
    }
    getVailableAccessToken() {
        return this.getAccessToken();
    }
    clearAccessToken() {
        return ims_cache_1.ImsCache.del(this.accessTokenKey);
    }
    getCode(scope, state) {
        return `${exports.WeixinApi.getCode}?${qs_1.stringify({
            appid: this.appId,
            redirect_uri: this.redirectUri,
            response_type: 'code',
            scope: scope,
            state: state,
        })}#wechat_redirect`;
    }
    getOpenid() {
        return rxjs_1.from(axios_1.default.get(this.getCode('snsapi_base', 'state'))).pipe();
    }
    getJsApiTicket() { }
    getJssdkConfig() { }
    getOauthUserInfo(accesstoken, openid) { }
    getOauthInfo(code) { }
    getOauthAccessToken() { }
    fansQueryInfo() { }
}
exports.WeixinAccount = WeixinAccount;
let weixin = new WeixinAccount('');
let app = express();
const path_1 = require("path");
app.use(express.static(path_1.join(__dirname, 'public')));
app.get('*', async (req, res, next) => {
    res.send('hello');
    res.end();
});
app.listen(80, '0.0.0.0');

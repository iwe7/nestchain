import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';
const varhttpAdapter = require('axios/lib/adapters/http');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
export class ImsHttpsClient {
  client: AxiosInstance;
  constructor(opt: { port: number; host: string }) {
    this.client = axios.create({
      adapter: varhttpAdapter,
      baseURL: `https://${opt.host}:${opt.port}`,
      timeout: 5000,
    });
  }
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T> {
    return this.client.request(config);
  }
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.client.get(url, config);
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.client.delete(url, config);
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.client.head(url, config);
  }
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise<T> {
    return this.client.post(url, data, config);
  }
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise<T> {
    return this.client.put(url, data, config);
  }
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise<T> {
    return this.client.patch(url, data, config);
  }
}

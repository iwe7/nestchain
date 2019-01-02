import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';

export class ImsHttpClient {
  client: AxiosInstance;
  constructor(opt: { port: number; host: string }) {
    this.client = axios.create({
      baseURL: `http://${opt.host}:${opt.port}`,
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

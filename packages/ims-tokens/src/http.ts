import http = require('http');
import { InjectionToken } from 'ims-core';
interface Http {
  createServer(
    requestListener?: (
      request: http.IncomingMessage,
      response: http.ServerResponse,
    ) => void,
  ): http.Server;
  createClient(port?: number, host?: string): any;
  request(
    options: http.RequestOptions | string | URL,
    callback?: (res: http.IncomingMessage) => void,
  ): http.ClientRequest;
  request(
    url: string | URL,
    options: http.RequestOptions,
    callback?: (res: http.IncomingMessage) => void,
  ): http.ClientRequest;
  get(
    options: http.RequestOptions | string | URL,
    callback?: (res: http.IncomingMessage) => void,
  ): http.ClientRequest;
  get(
    url: string | URL,
    options: http.RequestOptions,
    callback?: (res: http.IncomingMessage) => void,
  ): http.ClientRequest;
}
export const Http = new InjectionToken<Http>('Http');

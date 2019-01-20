import { Injectable } from 'ims-core';
const SpdyStreamMuxer = require('spdy-stream-muxer');
@Injectable({
  providedIn: 'root',
  useValue: SpdyStreamMuxer,
})
export class ImsSpdyStreamMuxer {}

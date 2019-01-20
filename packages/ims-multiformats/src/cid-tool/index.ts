import { Injectable } from 'ims-core';

const CIDTool = require('cid-tool');
@Injectable({
  providedIn: 'root',
  useValue: CIDTool,
})
export class ImsCidTool {}

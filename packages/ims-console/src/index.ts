import VConsole = require('vconsole');
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsConsole {
  log: VConsole;
  constructor() {
    this.log = new VConsole();
  }
}

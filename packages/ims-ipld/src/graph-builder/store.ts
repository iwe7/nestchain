import { Cid } from "ims-core";

export abstract class Store {
  abstract put(val, options): any;
  abstract get(link, node, dropOptions): any;
  static isValidLink: (val: any)=> val is Cid;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createProxy_1 = require("./createProxy");
class Demo {
    constructor() {
        this.title = 'title';
    }
    onGet(p, receiver) {
        return Reflect.get(this, p, receiver);
    }
}
exports.Demo = Demo;
let proxyDemo = createProxy_1.createProxy(Demo);
const demo = new proxyDemo();
console.log(demo.title);
debugger;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subject_1 = require("../Subject");
const multicast_1 = require("./multicast");
function publish(selector) {
    return selector ?
        multicast_1.multicast(() => new Subject_1.Subject(), selector) :
        multicast_1.multicast(new Subject_1.Subject());
}
exports.publish = publish;

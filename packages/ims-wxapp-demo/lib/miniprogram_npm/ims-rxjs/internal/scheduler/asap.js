"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AsapAction_1 = require("./AsapAction");
const AsapScheduler_1 = require("./AsapScheduler");
exports.asap = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);

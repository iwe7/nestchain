"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncAction_1 = require("./AsyncAction");
const AsyncScheduler_1 = require("./AsyncScheduler");
exports.async = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);

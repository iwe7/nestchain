"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QueueAction_1 = require("./QueueAction");
const QueueScheduler_1 = require("./QueueScheduler");
exports.queue = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);

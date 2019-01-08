"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AnimationFrameAction_1 = require("./AnimationFrameAction");
const AnimationFrameScheduler_1 = require("./AnimationFrameScheduler");
exports.animationFrame = new AnimationFrameScheduler_1.AnimationFrameScheduler(AnimationFrameAction_1.AnimationFrameAction);

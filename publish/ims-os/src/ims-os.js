"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
class ImsOs {
    getOs() {
        return {
            arch: os.arch(),
            cpus: os.cpus(),
            freemem: os.freemem(),
            hostname: os.hostname(),
            loadavg: os.loadavg(),
            networkInterfaces: os.networkInterfaces(),
            platform: os.platform(),
            release: os.release(),
            tmpdir: os.tmpdir(),
            totalmem: os.totalmem(),
            type: os.type(),
            uptime: os.uptime(),
            homedir: os.homedir()
        };
    }
}
exports.ImsOs = ImsOs;

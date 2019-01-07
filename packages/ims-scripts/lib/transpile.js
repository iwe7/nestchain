"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const cp = require("child_process");
function tsc(tsConfigPath) {
    tsConfigPath = path.resolve(__dirname, tsConfigPath);
    try {
        var cmd = 'npx tsc -p ' + tsConfigPath;
        cp.execSync(cmd, { cwd: __dirname }).toString();
        return true;
    }
    catch (e) {
        console.log(e.stdout.toString());
        return false;
    }
}
exports.tsc = tsc;

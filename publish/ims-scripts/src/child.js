"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const execa = require("execa");
const logTransformer = require("strong-log-transformer");
let children = 0;
const colorWheel = ['cyan', 'magenta', 'blue', 'yellow', 'green', 'red'];
const NUM_COLORS = colorWheel.length;
function exec(command, args, opts) {
    const options = Object.assign({ stdio: 'pipe' }, opts);
    const spawned = spawnProcess(command, args, options);
    return wrapError(spawned);
}
exports.exec = exec;
function execSync(command, args, opts) {
    return execa.sync(command, args, opts).stdout;
}
exports.execSync = execSync;
function spawn(command, args = [], opts) {
    const options = Object.assign({}, opts, { stdio: 'inherit' });
    const spawned = spawnProcess(command, args, options);
    return wrapError(spawned);
}
exports.spawn = spawn;
function spawnStreaming(command, args, opts, prefix) {
    const options = Object.assign({}, opts);
    options.stdio = ['ignore', 'pipe', 'pipe'];
    const colorName = colorWheel[children % NUM_COLORS];
    const color = chalk[colorName];
    const spawned = spawnProcess(command, args, options);
    const stdoutOpts = {};
    const stderrOpts = {};
    if (prefix) {
        stdoutOpts.tag = `${color.bold(prefix)}:`;
        stderrOpts.tag = `${color(prefix)}:`;
    }
    if (children > process.stdout.listenerCount('close')) {
        process.stdout.setMaxListeners(children);
        process.stderr.setMaxListeners(children);
    }
    spawned.stdout.pipe(logTransformer(stdoutOpts)).pipe(process.stdout);
    spawned.stderr.pipe(logTransformer(stderrOpts)).pipe(process.stderr);
    return wrapError(spawned);
}
exports.spawnStreaming = spawnStreaming;
function getChildProcessCount() {
    return children;
}
exports.getChildProcessCount = getChildProcessCount;
function spawnProcess(command, args, opts) {
    children += 1;
    const child = execa(command, args, opts);
    const drain = (code, signal) => {
        children -= 1;
        if (signal === undefined) {
            child.removeListener('exit', drain);
        }
    };
    child.once('exit', drain);
    child.once('error', drain);
    if (opts.pkg) {
        child.pkg = opts.pkg;
    }
    return child;
}
function wrapError(spawned) {
    if (spawned.pkg) {
        return spawned.catch(err => {
            if (err.code) {
                err.pkg = spawned.pkg;
            }
            throw err;
        });
    }
    return spawned;
}

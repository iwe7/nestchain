import chalk = require('chalk');
import execa = require('execa');
import logTransformer = require('strong-log-transformer');

// bookkeeping for spawned processes
let children = 0;

// when streaming children are spawned, use this color for prefix
const colorWheel = ['cyan', 'magenta', 'blue', 'yellow', 'green', 'red'];
const NUM_COLORS = colorWheel.length;

export function exec(
  command: string,
  args: ReadonlyArray<string> = [],
  opts?: Options,
) {
  const options = Object.assign({ stdio: 'pipe' }, opts);
  const spawned = spawnProcess(command, args, options);
  return wrapError(spawned);
}

export function execSync(
  command: string,
  args: ReadonlyArray<string> = [],
  opts?: execa.SyncOptions,
) {
  return execa.sync(command, args, opts).stdout;
}

export function spawn(
  command: string,
  args: ReadonlyArray<string> = [],
  opts?: Options,
) {
  const options = Object.assign({}, opts, { stdio: 'inherit' });
  const spawned = spawnProcess(command, args, options);
  return wrapError(spawned);
}

// istanbul ignore next
export function spawnStreaming(
  command: string,
  args: ReadonlyArray<string> = [],
  opts?: Options,
  prefix?: string,
) {
  const options = Object.assign({}, opts);
  options.stdio = ['ignore', 'pipe', 'pipe'];

  const colorName = colorWheel[children % NUM_COLORS];
  const color = chalk[colorName];
  const spawned = spawnProcess(command, args, options);

  const stdoutOpts: any = {};
  const stderrOpts: any = {}; // mergeMultiline causes escaped newlines :P

  if (prefix) {
    stdoutOpts.tag = `${color.bold(prefix)}:`;
    stderrOpts.tag = `${color(prefix)}:`;
  }

  // Avoid "Possible EventEmitter memory leak detected" warning due to piped stdio
  if (children > process.stdout.listenerCount('close')) {
    process.stdout.setMaxListeners(children);
    process.stderr.setMaxListeners(children);
  }

  spawned.stdout.pipe(logTransformer(stdoutOpts)).pipe(process.stdout);
  spawned.stderr.pipe(logTransformer(stderrOpts)).pipe(process.stderr);

  return wrapError(spawned);
}

export function getChildProcessCount() {
  return children;
}
function isOptions(val: any): val is Options {
  return !Array.isArray(val);
}
interface Options extends execa.Options {
  pkg?: string;
}
interface ExecaChildProcess extends execa.ExecaChildProcess {
  pkg?: string;
}
function spawnProcess(
  file: string,
  args?: ReadonlyArray<string>,
  options?: Options,
): ExecaChildProcess;
function spawnProcess(file: string, options?: Options): ExecaChildProcess;
function spawnProcess(
  command: string,
  args: ReadonlyArray<string> | execa.Options = [],
  opts?: Options,
) {
  children += 1;
  let child: ExecaChildProcess;
  if (Array.isArray(args)) {
    child = execa(command, args, opts);
  }
  if (isOptions(args)) {
    child = execa(command, opts);
  }
  const drain = (code, signal) => {
    children -= 1;
    // don't run repeatedly if this is the error event
    if (signal === undefined) {
      child.removeListener('exit', drain);
    }
  };

  child.once('exit', drain);
  child.once('error', drain);
  if (opts && opts.pkg) {
    child.pkg = opts.pkg;
  }
  return child;
}

function wrapError(spawned: any) {
  if (spawned.pkg) {
    return spawned.catch(err => {
      // istanbul ignore else
      if (err.code) {
        // log non-lerna error cleanly
        err.pkg = spawned.pkg;
      }
      throw err;
    });
  }
  return spawned;
}

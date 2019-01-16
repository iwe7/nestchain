const MOVE_LEFT = Buffer.from('1b5b3130303044', 'hex').toString();
const MOVE_UP = Buffer.from('1b5b3141', 'hex').toString();
const CLEAR_LINE = Buffer.from('1b5b304b', 'hex').toString();
const stringWidth = require('string-width');
import { Injectable } from 'ims-core';
@Injectable({
  providedIn: 'root',
})
export class ImsSingleLineLog {
  stdout: Function & { clear: Function };
  stderr: Function & { clear: Function };
  constructor() {
    this.stderr = this.create(process.stderr);
    this.stdout = this.create(process.stdout);
  }
  create(stream: NodeJS.WriteStream) {
    let write = stream.write;
    let str: string;
    let prevLineCount = 0;
    stream.write = function(data) {
      if (str && data !== str) str = null;
      return write.apply(this, arguments);
    };
    if (stream === process.stderr || stream === process.stdout) {
      process.on('exit', function() {
        if (str !== null) stream.write('');
      });
    }
    function log() {
      str = '';
      let nextStr = Array.prototype.join.call(arguments, ' ');
      // Clear screen
      for (var i = 0; i < prevLineCount; i++) {
        str += MOVE_LEFT + CLEAR_LINE + (i < prevLineCount - 1 ? MOVE_UP : '');
      }
      // Actual log output
      str += nextStr;
      stream.write(str);
      // How many lines to remove on next clear screen
      let prevLines = nextStr.split('\n');
      prevLineCount = 0;
      for (var i = 0; i < prevLines.length; i++) {
        prevLineCount +=
          Math.ceil(stringWidth(prevLines[i]) / stream.columns) || 1;
      }
    }
    log.clear = function() {
      stream.write('');
    };
    return log;
  }
}

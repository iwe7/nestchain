import { ImsSingleLineLog } from './single_log';
import { Injectable } from 'ims-core';
import chalk from 'chalk';

@Injectable({
  providedIn: 'root',
})
export class ProgressBar {
  length: number = 25;
  constructor(public log: ImsSingleLineLog) {}

  render(opts: { completed: number; total: number; msg: string }): void {
    let percent: any = (opts.completed / opts.total).toFixed(4);
    let cell_num = Math.floor(percent * this.length);
    let cell = '';
    for (var i = 0; i < cell_num; i++) {
      cell += chalk.cyan('█');
    }
    let empty = '';
    for (var i = 0; i < this.length - cell_num; i++) {
      empty += chalk.bgWhite('░');
    }
    let cmdText =
      chalk.cyan(`${opts.msg || 'Progress'}:`) +
      chalk.yellow(`${(100 * percent).toFixed(2)}%`) +
      cell +
      empty;
    this.log.stdout(cmdText);
  }
}

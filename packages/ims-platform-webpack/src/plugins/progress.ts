import { ProgressPlugin } from 'webpack';
import { ProgressBar } from 'ims-single-linelog';
import { Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackProgressPlugin {
  private plugin: ProgressPlugin;
  constructor(public bar: ProgressBar) {
    this.plugin = new ProgressPlugin((percentage: number, msg: string) => {
      this.bar.render({
        completed: percentage,
        total: 1,
        msg,
      });
    });
  }
  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
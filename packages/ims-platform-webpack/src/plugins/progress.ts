import { ProgressPlugin } from 'webpack';
import { ProgressBar } from 'ims-single-linelog';
import { Compiler } from 'webpack';
import { Injectable, Injector } from 'ims-core';

@Injectable({
  providedIn: 'root',
  useFactory: async (injector: Injector) => {
    let bar = await injector.get<ProgressBar>(ProgressBar)
    return new ImsWebpackProgressPlugin(bar)
  },
  deps: [Injector],
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

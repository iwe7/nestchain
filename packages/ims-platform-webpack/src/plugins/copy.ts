import CopyWebpackPlugin = require('copy-webpack-plugin');
import { Compiler } from 'webpack';
import {
  Injectable,
  Injector,
  SourceRoot,
  AppRoot,
  PlatformName,
} from 'ims-core';
import { ROOT } from 'ims-const';
import { join } from 'path';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackCopyPlugin {
  plugin: any;
  constructor(private injector: Injector) {
    let root = injector.get(SourceRoot, ROOT);
    let appRoot = this.injector.get(AppRoot, ROOT);
    let platform = this.injector.get(PlatformName, 'web');
    let app = join(appRoot, 'template', platform);
    this.plugin = new CopyWebpackPlugin([root + `/**/*`, root + `/*`]);
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}

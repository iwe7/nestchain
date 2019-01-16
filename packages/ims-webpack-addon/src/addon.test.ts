import { ImsWebpackAddonModule } from './index';
import { webpackPlatform, ImsWebpack } from 'ims-platform-webpack';

webpackPlatform([])
  .then(res => res.bootstrapModule(ImsWebpackAddonModule))
  .then(async res => {
    let webpack = res.injector.get<ImsWebpack>(ImsWebpack);
    webpack.init(res.injector);
    webpack.run().subscribe(res => {
      console.log(res);
    });
  });

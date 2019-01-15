import { ImsWebpackAddonModule } from './index';
import { corePlatform } from 'ims-core';
import { ImsWebpack } from 'ims-webpack';

corePlatform().then(res => {
  res.bootstrapModule(ImsWebpackAddonModule).then(res => {
    let webpack = res.injector.get<ImsWebpack>(ImsWebpack);
    webpack.run()
  });
});

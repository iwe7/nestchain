import { ImsWebpackAddonModule } from './index';
import { corePlatform } from 'ims-core';
import { ImsWebpack } from 'ims-platform-webpack';
corePlatform([])
  .then(res => res.bootstrapModule(ImsWebpackAddonModule))
  .then(async res => {
    let webpack = await res.injector.get<ImsWebpack>(ImsWebpack);
    await webpack.init(res.injector);
    // webpack.server();
    webpack.apply().subscribe(res => {
      console.log(res);
    });
  });

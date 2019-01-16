import { ImsWebpackAddonModule } from './index';
import { bootstrap, ImsWebpack } from 'ims-platform-webpack';

bootstrap({
  imports: [ImsWebpackAddonModule],
}).then(async res => {
  let webpack = res.injector.get<ImsWebpack>(ImsWebpack);
  let stats = await webpack.run();
  debugger;
});

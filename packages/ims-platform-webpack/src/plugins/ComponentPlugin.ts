import ComponentPlugin = require('component-webpack-plugin');
import { Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackComponentPlugin {
  plugin: ComponentPlugin;
  constructor() {
    this.plugin = new ComponentPlugin(
      {
        // 从 component.json 中加载 xyz 字段 in component.json
        xyz: true,
        // 这等同于：xyz: "[file]"

        // 使用 xyz-loader 加载 xyz 字段
        // xyz: '!xyz-loader![file]',

        // 默认为：
        // styles: "!style-loader!css-loader![file]"
      },
      [
        // 查找路径
        'component',
      ],
    );
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}

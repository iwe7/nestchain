import { makeDecorator, TypeDecorator } from 'ims-decorator';
import { IInjector } from 'ims-core';
export const AddonMetadataKey = 'AddonMetadataKey';

export interface AddonOptions {
  /**
   * 数据库文件
   */
  entity: IInjector;
  /**
   * 插件名
   */
  title: string;
  /**
   * 插件版本
   */
  version: string;
  /**
   * 插件接口
   */
  proto: string;
}

export interface AddonDecorator {
  (opt: AddonOptions): TypeDecorator;
}
export const Addon: AddonDecorator = makeDecorator(
  AddonMetadataKey,
  'visitAddon',
  dir => dir,
);

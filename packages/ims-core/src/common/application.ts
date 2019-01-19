import { Observer } from 'ims-rxjs';
import { Injector } from '../di/injector';
/**
 * 应用
 *
 * 安卓应用
 * AndroidApplication
 * 苹果应用
 * IosApplication
 * 电脑端
 * PcApplication
 * 手机端
 * MobileApplication
 * 微信小程序
 * WxappApplication
 * 微信公众平台
 * WeixinApplication
 * Electron端
 * ElectronApplication
 */
export abstract class Application {
  injector: Injector;
  abstract init(): Promise<void>;
  abstract addObserver<T>(type: string, observer: Observer<T>): any;
  abstract removeObserver<T>(observer: Observer<T>, type?: string): any;
}

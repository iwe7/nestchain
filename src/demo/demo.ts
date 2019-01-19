import { corePlatform, NgModule } from 'ims-core';
import { ImsDomReady, ImsNavigator, getUserMedia } from 'ims-dom';
import { ImsRootStream } from 'ims-stream';
import { ImsConsole } from 'ims-console';

import { filter } from 'ims-rxjs/operators';

/**
 * 为了hot loader
 */
// import './index.html';
export function add(a, b) {
  return a + b;
}
export const version = 1.0;

// let res = add(1, 2);
// console.log(version);
// console.log(res);

RTCPeerConnection;

@NgModule()
export class ImsDemo {}

corePlatform()
  .then(res => res.bootstrapModule(ImsDemo))
  .then(res => {
    const domReady = res.injector.get<ImsDomReady>(ImsDomReady);
    const imsNavigator = res.injector.get<ImsNavigator>(ImsNavigator);
    const imsRootStream = res.injector.get<ImsRootStream>(ImsRootStream);
    const imsConsole = res.injector.get<ImsConsole>(ImsConsole);
    console.log(imsConsole);
    imsRootStream
      .pipe(filter((res: any) => res.type === 'dom.ready'))
      .subscribe(res => {
        getUserMedia({
          peerIdentity: 'fromUser',
          audio: true,
          video: true,
        })
          .then(stream => {
            console.log(stream);
            let video = document.createElement('video');
            video.autoplay = true;
            video.srcObject = stream;
            document.getElementById('app').appendChild(video);
          })
          .catch(e => {
            console.log(e, navigator);
          });
      });
    domReady.ready();
    console.log('platform bootstrap success');
  });

import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsNavigator {
  getDisplayMedia = (navigator.getDisplayMedia =
    navigator.getDisplayMedia ||
    function(constraints: MediaStreamConstraints) {
      return new Promise((resolve, reject) => {
        let _getUserMedia =
          navigator.mediaDevices.getUserMedia.bind(navigator) ||
          (navigator as any).webkitGetUserMedia.bind(navigator) ||
          (navigator as any).mozGetUserMedia.bind(navigator);
        _getUserMedia(
          constraints,
          stram => {
            resolve(stram);
          },
          err => {
            reject(err);
          },
        );
      });
    });
}

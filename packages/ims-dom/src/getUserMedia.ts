import { isPromise } from 'ims-util';

export class NotSupportedError extends Error {
  constructor(msg?: string) {
    super(msg ? msg : 'getUserMedia is not implemented in this browser');
  }
}
const gump = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
const gum: (
  constraints: MediaStreamConstraints,
  successCallback: NavigatorUserMediaSuccessCallback,
  errorCallback: NavigatorUserMediaErrorCallback,
) => void =
  navigator.getUserMedia.bind(navigator) ||
  (navigator as any).webkitGetUserMedia.bind(navigator) ||
  (navigator as any).mozGetUserMedia.bind(navigator) ||
  (navigator as any).msGetUserMedia.bind(navigator);

export function getUserMedia(
  constraints: MediaStreamConstraints,
): Promise<MediaStream> {
  if (gump) {
    return navigator.mediaDevices.getUserMedia(constraints);
  }
  return new Promise((resolve, reject) => {
    if (!gum) return reject(new NotSupportedError());
    gum(
      constraints,
      stream => {
        resolve(stream);
      },
      err => {
        let res = (gum as any)(constraints);
        if (isPromise(res)) {
          res.then(data => resolve(data)).catch(e => reject(e));
        } else {
          reject(err);
        }
      },
    );
  });
}

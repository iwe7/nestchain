import { lookup } from 'dns';
import { isIPv4 } from 'net';
import { Observable } from 'rxjs';
export default (ip: string) => {
  return new Observable((obs: any) => {
    if (isIPv4(ip)) {
      obs.next(ip);
      obs.complete();
    } else {
      lookup(ip, { family: 4 }, (err, address) => {
        if (err) obs.error(err);
        obs.next(address);
        obs.complete();
      });
    }
  });
};

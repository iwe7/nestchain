import { create } from 'domain';
import { Observable } from 'rxjs';
export default () => {
  return new Observable((obs: any) => {
    const d = create();
    d.on('error', err => {
      obs.error(err);
    });
    d.run(() => {
      // todo
      obs.next();
      obs.complete();
    });
    process.on('uncaughtException', err => {
      obs.error(err);
    });
    process.on('unhandledRejection', err => {
      obs.error(err);
    });
    process.on('unhandledRejection', err => {
      obs.error(err);
    });
  });
};

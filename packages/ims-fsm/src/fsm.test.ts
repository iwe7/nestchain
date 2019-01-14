import { bootstrap } from 'ims-platform-node';
import { FsmEventFactory } from '.';

bootstrap({}).then(res => {
  let fsm = res.injector.get(FsmEventFactory);
  let fsmEvent = fsm.create('started', {
    /**
     * 已经停止
     */
    stopped: {
      start: 'starting',
      stop: 'stopped',
    },
    [`stopped:leave`]: true,
    [`stopped:enter`]: true,
    /**
     * 正在启动
     */
    starting: {
      done: 'started',
      abort: 'stopped',
      stop: 'stopping',
    },
    [`starting:leave`]: true,
    [`starting:enter`]: true,
    /**
     * 已经启动
     */
    started: {
      stop: 'stopping',
      start: 'started',
    },
    [`started:leave`]: true,
    [`started:enter`]: true,
    /**
     * 正在停止
     */
    stopping: {
      stop: 'stopping',
      done: 'stopped',
    },
    [`stopping:leave`]: true,
    [`stopping:enter`]: true,
  });
  fsmEvent.subscribe((res: [string, any] | [string]) => {
    if (res.length === 1) {
      console.log(res[0]);
    } else {
      console.log(res[0]);
      res[1]();
    }
  });
  fsmEvent.emit('stop');
  debugger;
});

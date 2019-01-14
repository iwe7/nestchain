import { Injectable, NgModule } from 'ims-core';
import { each, empty, contains, disunion, union, keys } from 'ims-util';
import { Subject } from 'ims-rxjs';
@Injectable({
  providedIn: 'root',
})
export class ImsFsm {
  validate(fsm: any) {
    each(fsm, (state, name) => {
      each(state, (_state, event) => {
        if (!fsm[_state]) {
          throw new Error(
            `invalid transition from state:${name} to state: ${_state} on event: ${event}`,
          );
        }
      });
    });
    return true;
  }
  reachable(fsm: any) {
    let reachable = {};
    let added = false;
    do {
      added = false;
      each(fsm, (state, name) => {
        let reach = (reachable[name] = reachable[name] || {});
        each(state, (_name, event) => {
          if (!reach[_name]) (reach[_name] = [event]), (added = true);
        });
        each(state, (_name, event) => {
          let _state = reachable[_name];
          each(_state, (path, _name) => {
            if (!reach[_name])
              (reach[_name] = [event].concat(path)), (added = true);
          });
        });
      });
    } while (added);
    return reachable;
  }
  deadlock(fsm: any): any[] {
    let dead = [];
    each(fsm, (state, name) => {
      if (empty(state)) dead.push(name);
    });
    return dead;
  }
  terminal(fsm: any) {
    return this.deadlock(fsm);
  }
  livelock(fsm, terminals) {
    let reach = this.reachable(fsm),
      locked = [];
    each(reach, function(reaches, name) {
      if (contains(terminals, name)) return;
      each(terminals, function(_name) {
        if (!reaches[_name] && !contains(locked, name)) locked.push(name);
      });
    });
    return locked.sort();
  }
  combine(fsm1: any, fsm2: any, start1: any, start2: any) {
    var combined = {};
    var events1 = events(fsm1);
    var events2 = events(fsm2);
    var independent = disunion(events1, events2);

    const expand = (name1, name2) => {
      var cName = name1 + '-' + name2,
        state;
      if (!combined[cName]) combined[cName] = {};
      state = combined[cName];

      //Q: what are the events which are allowed to occur from this state?
      //A: independent events (used in only one fsm) or events that occur in both fsms in current state.

      let trans1 = keys(fsm1[name1]),
        trans2 = keys(fsm2[name2]);
      let allowed = union(trans1, trans2);

      //expand to a new state
      allowed.forEach(function(event) {
        state[event] = fsm1[name1][event] + '-' + fsm2[name2][event];
        if (!combined[state[event]])
          expand(fsm1[name1][event], fsm2[name2][event]);
      });

      //only transition fsm1
      union(independent, trans1).forEach(function(event) {
        state[event] = fsm1[name1][event] + '-' + name2;
        if (!combined[state[event]]) expand(fsm1[name1][event], name2);
      });

      union(independent, trans2).forEach(function(event) {
        state[event] = name1 + '-' + fsm2[name2][event];
        if (!combined[state[event]]) expand(name1, fsm2[name2][event]);
      });

      return combined[cName];
    };
    expand(start1, start2);
    return combined;
  }
}

function events(fsm: any) {
  var events = [];
  each(fsm, (state, name) => {
    each(state, (_state, event) => {
      if (!contains(events, event)) events.push(event);
    });
  });
  return events.sort();
}

export class FsmEvent extends Subject<[string, any] | [string]> {
  _graph: any;
  _state: string;
  _events: any[];
  constructor(start: string, events: any, public fsm: ImsFsm) {
    super();
    if (typeof start === 'object') {
      events = start;
      start = 'START';
    }
    this._graph = this.fsm.reachable(events);
    this._state = start;
    this._events = events;
  }

  next(data: [string, any] | [string]) {
    super.next(data);
  }

  emit(str: string) {
    const nwState = this._events[this._state][str];
    if (!this.reach(this._state, nwState, this._graph)) {
      const err = 'invalid transition: ' + this._state + ' -> ' + str;
      return super.error(err);
    }
    const leaveEv = this._state + ':leave';
    const enterEv = nwState + ':enter';
    const leave = () => {
      let canLeave = this._events[leaveEv];
      if (!canLeave) {
        enter();
      } else {
        this.next([leaveEv, enter]);
      }
    };
    const enter = () => {
      let canEnter = this._events[enterEv];
      if (!canEnter) {
        done();
      } else {
        this.next([enterEv, done]);
      }
    };
    const done = () => {
      this._state = nwState;
      this.next([nwState]);
      this.next(['done']);
    };
    if (!this._state) return enter();
    return leave();
  }
  reach(curr, next, reachable) {
    if (!next) return false;
    if (!curr) return true;
    const here = reachable[curr];
    if (!here || !here[next]) return false;
    return here[next].length === 1;
  }
}

@Injectable({
  providedIn: 'root',
})
export class FsmEventFactory {
  constructor(private fsm: ImsFsm) {}
  create(start: string, events: any): FsmEvent {
    return new FsmEvent(start, events, this.fsm);
  }
}

@NgModule()
export class ImsFsmModule {}

import { Provider, Injector } from 'ims-core';
import * as tokens from '../../tokens/index';

export default [
  {
    provide: tokens.BootToken,
    useFactory: async (injector: Injector) => {
      return async () => {
        let repoFactory = await injector.get(tokens.RepoFactory);
        let options = await injector.get(tokens.Options);
        let repo: tokens.Repo;
        if (typeof options.repo === 'string') {
          repo = await repoFactory.create(options.repo);
        } else {
          repo = options.repo;
        }

        let state = await injector.get(tokens.State);
        let currentState = state.state();
        debugger;
        // 打开repo
        await repo.open();
        //  初始化
        let init = await injector.get(tokens.Init);
        await init(options.init);
        // start
        let start = await injector.get(tokens.Start);
        await start();

        console.log('ims ipfs boot success');
      };
    },
    deps: [Injector],
  },
] as Provider[];

import { errors as RepoErrors } from 'ipfs-repo';
function isRepoUninitializedError(err) {
  if (!err) {
    return false;
  }
  if (err.code === RepoErrors.ERR_REPO_NOT_INITIALIZED) {
    return true;
  }
  if (
    err.message.match(/not found/) || // indexeddb
    err.message.match(/ENOENT/) || // fs
    err.message.match(/No value/) // memory
  ) {
    return true;
  }
  return false;
}

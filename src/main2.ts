import { ImsIpfs, IpfsConfig } from 'ims-ipfs';
import { corePlatform, CoreModule, NgModule } from 'ims-core';
import express = require('express');
let app = express();
const Repo = require('ipfs-repo');
const fsLock = require('ipfs-repo/src/lock');
const customRepositoryOptions = {
  storageBackends: {
    root: require('datastore-fs'), // version and config data will be saved here
    blocks: require('datastore-fs'),
    keys: require('datastore-fs'),
    datastore: require('datastore-fs'),
  },
  storageBackendOptions: {
    root: {
      extension: '.ipfsroot', // Defaults to ''. Used by datastore-fs; Appended to all files
      errorIfExists: false, // Used by datastore-fs; If the datastore exists, don't throw an error
      createIfMissing: true, // Used by datastore-fs; If the datastore doesn't exist yet, create it
    },
    blocks: {
      sharding: false, // Used by IPFSRepo Blockstore to determine sharding; Ignored by datastore-fs
      extension: '.ipfsblock', // Defaults to '.data'.
      errorIfExists: false,
      createIfMissing: true,
    },
    keys: {
      extension: '.ipfskey', // No extension by default
      errorIfExists: false,
      createIfMissing: true,
    },
    datastore: {
      extension: '.ipfsds', // No extension by default
      errorIfExists: false,
      createIfMissing: true,
    },
  },
  lock: fsLock,
};
@NgModule({
  providers: [],
  imports: [],
})
export class MainModule {}
corePlatform()
  .then(res => res.bootstrapModule(CoreModule))
  .then(async res => {
    res.injector.set([
      {
        provide: IpfsConfig,
        useValue: {
          repo: new Repo('.ipfs2', customRepositoryOptions),
          config: {
            Addresses: {
              Swarm: ['/ip4/0.0.0.0/tcp/4300', '/ip4/127.0.0.1/tcp/4301/ws'],
              API: '/ip4/127.0.0.1/tcp/4302',
              Gateway: '/ip4/127.0.0.1/tcp/4303',
            },
          },
        },
      },
    ]);
    let ipfs: any = await res.injector.get(ImsIpfs);
    ipfs.files
      .add({
        path: 'test-data2.txt',
        content: Buffer.from('We are using a customized repo2!'),
      })
      .then(res => {
        console.log(res);
      });
    app.get('/:id', (req, res, next) => {
      let id = req.params.id;
      ipfs.files
        .cat(id)
        .then(data => {
          let str = data.toString();
          res.end(str);
        })
        .catch(e => {
          res.end(e.message);
        });
    });
    app.listen(3002);
  });

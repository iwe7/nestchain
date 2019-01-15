import { Libp2pNodeFactory } from './libp2p_node_factory';
const get = require('lodash/get');
const defaultsDeep = require('@nodeutils/defaults-deep');
export class Libp2p {
  _libp2pNode: any;
  static defaultOptions = {};
  constructor(
    public _options: any,
    public libP2pFactory: Libp2pNodeFactory,
    public ipnsUtils: any,
  ) {}
  start() {
    let node = this.createLibp2pNode(this.config);
  }
  async stop() {
    return new Promise((resolve, reject) => {
      this._libp2pNode.stop(err => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  private getOptions(opts: any) {
    const libp2pDefaults = {
      datastore: opts.datastore,
      peerInfo: opts.peerInfo,
      peerBook: opts.peerBook,
      config: {
        peerDiscovery: {
          mdns: {
            enabled: get(
              opts.options,
              'config.Discovery.MDNS.Enabled',
              get(opts.config, 'Discovery.MDNS.Enabled', true),
            ),
          },
          webRTCStar: {
            enabled: get(
              opts.options,
              'config.Discovery.webRTCStar.Enabled',
              get(opts.config, 'Discovery.webRTCStar.Enabled', true),
            ),
          },
          bootstrap: {
            list: get(
              opts.options,
              'config.Bootstrap',
              get(opts.config, 'Bootstrap', []),
            ),
          },
        },
        relay: {
          enabled: get(
            opts.options,
            'relay.enabled',
            get(opts.config, 'relay.enabled', false),
          ),
          hop: {
            enabled: get(
              opts.options,
              'relay.hop.enabled',
              get(opts.config, 'relay.hop.enabled', false),
            ),
            active: get(
              opts.options,
              'relay.hop.active',
              get(opts.config, 'relay.hop.active', false),
            ),
          },
        },
        dht: {
          validators: {
            ipns: this.ipnsUtils.validator,
          },
          selectors: {
            ipns: this.ipnsUtils.selector,
          },
        },
        EXPERIMENTAL: {
          dht: get(opts.options, 'EXPERIMENTAL.dht', false),
          pubsub: get(opts.options, 'EXPERIMENTAL.pubsub', false),
        },
      },
      connectionManager: get(
        opts.options,
        'connectionManager',
        get(opts.config, 'connectionManager', {}),
      ),
    };
    const libp2pOptions = defaultsDeep(
      get(this._options, 'libp2p', {}),
      libp2pDefaults,
    );
    return libp2pOptions;
  }

  private createLibp2pNode(config: any) {
    let opts = {
      options: this._options,
      config: config,
      datastore: this._repo.datastore,
      peerInfo: this._peerInfo,
      peerBook: this._peerInfoBook,
    };
    let options = this.getOptions(opts);
    let node =  this.libP2pFactory.create(options);
    node.on('peer:discovery',()=>{

    })
  }
}

import SCBroker = require('socketcluster/scbroker');
import scClusterBrokerClient = require('scc-broker-client');
class P2pBroker extends SCBroker {
  run() {
    console.log('   >> Broker PID:', process.pid);
  }
}
new P2pBroker();

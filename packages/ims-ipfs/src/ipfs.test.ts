import { ImsIpfs } from './ims-ipfs';

let node = new ImsIpfs();

node.on('ready', (...args: any[]) => {
  console.log('Node is ready to use!');
  debugger;
  node.stop(error => {
    if (error) {
      return console.error('Node failed to stop cleanly!', error);
    }
    console.log('Node stopped!');
  });
});

node.on('error', error => {
  console.error('Something went terribly wrong!', error);
});

node.on('stop', () => console.log('Node stopped!'));

node.id((err, identity) => {
  if (err) {
    throw err;
  }
  console.log(identity);
});

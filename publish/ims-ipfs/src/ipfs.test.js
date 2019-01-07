"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_ipfs_1 = require("./ims-ipfs");
let node = new ims_ipfs_1.ImsIpfs();
node.on('ready', (...args) => {
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

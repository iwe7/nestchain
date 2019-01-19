import { Injectable } from 'ims-core';
const ipldGit = require('ipld-git');

@Injectable({
  providedIn: 'root',
  useFactory: () => {
    return ipldGit;
  },
  deps: [],
})
export class IpldGit {}

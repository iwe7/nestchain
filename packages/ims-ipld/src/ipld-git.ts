import { Injectable } from 'ims-core';
const ipldGit = require('ipld-git');

@Injectable({
  providedIn: 'root',
  useValue: ipldGit
})
export class ImsIpldGit {}

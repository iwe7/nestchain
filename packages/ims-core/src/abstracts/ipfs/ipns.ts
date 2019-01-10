export abstract class Ipns {
  abstract publish(privKey, value, lifetime): any;
  abstract resolve(name, options): any;
  abstract initializeKeyspace(privKey, value): any;
}

export abstract class ClientFactory {
  abstract create(hostOrMultiaddr, port, opts): any;
}

export enum ConnectionType {
  none = 0,
  wifi = 1,
  mobile = 2,
  ethernet = 3,
  bluetooth = 4,
}
export abstract class Connectivity {
  abstract getConnectionType(): Promise<ConnectionType>;
  abstract startMonitoring(): Promise<ConnectionType>;
  abstract stopMonitoring(): Promise<void>;
}

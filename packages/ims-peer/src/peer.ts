import { fromLong } from 'ip';
export class Peer {
  parseInt(s: string, fall: number): number {
    let integer = parseInt(s);
    integer = Number.isNaN(integer) ? fall : integer;
    return integer;
  }
}

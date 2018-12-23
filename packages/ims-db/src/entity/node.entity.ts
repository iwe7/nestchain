import { Entity, Column } from 'typeorm';

@Entity('ims-node')
export class Node {
  @Column()
  ip: string;
  @Column()
  port: number;
}

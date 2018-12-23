import { Entity, Column } from 'typeorm';

@Entity('ims-user')
export class User {
  @Column()
  publicKey: string;
  @Column()
  address: string;
}

import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('ims_p2p_server')
export class P2pServerEntity {
  @ObjectIdColumn()
  id: ObjectID;
  @Column({
    unique: true,
  })
  address: string;
}

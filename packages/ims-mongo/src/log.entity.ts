import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity('ims-node')
export class Log {
  @ObjectIdColumn()
  id: ObjectID;

  /**
   * ip地址
   */
  @Column()
  ip: string;
  /**
   * 端口号
   */
  @Column()
  port: number;
  /**
   * 状态
   */
  @Column()
  status: number;
  /**
   * 包
   */
  @Column()
  package: string;
  /**
   * 服务
   */
  @Column()
  service: string;
  /**
   * 方法
   */
  @Column()
  method: string;
  /**
   * 参数
   */
  @Column()
  params: string;
}

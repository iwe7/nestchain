import { createConnection, ConnectionOptions } from 'typeorm';
import { Log } from './log.entity';
const options: ConnectionOptions = {
  type: 'mongodb',
  host: 'localhost',
  database: 'test',
  port: 27017,
  logging: ['query', 'error'],
  entities: [Log],
  useNewUrlParser: true,
};
createConnection(options).then(async connection => {
  const log = new Log();
  /**
   * save
   */
  await connection.getRepository(Log).save(log);
  /**
   * findOne
   */
  const loadedPost = await connection.getRepository(Log).findOne({
    ip: 'Hello how are you?',
  });
  /**
   * find
   */
  const allPosts = await connection.getRepository(Log).find();
  /**
   * createEntityCursor
   */
  const cursor1 = connection
    .getMongoRepository(Log)
    .createEntityCursor({ ip: 'hello' });

  const cursor2 = connection.mongoManager.createEntityCursor(Log, {
    ip: 'hello',
  });

  console.log('run');

  connection.close();
});

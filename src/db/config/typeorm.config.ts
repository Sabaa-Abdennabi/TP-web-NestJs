import { Users } from 'src/auth/auth.entity';
import { Cv } from '../../cv/entities/cv.entity';
import { Skill } from '../../skill/entities/skill.entity';
import { User } from '../../user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
(async () => {
  const TypeOrmConfig: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    synchronize: true,
    username: 'postgres',
    password: '0000',
    database: 'postgres',
    entities: [User, Skill, Cv, Users],
    seeds: ['src/db/seeds/**/*{.ts,.js}'],
    factories: ['src/db/factories/**/*{.ts,.js}'],
  };

  const dataSource = new DataSource(TypeOrmConfig);

  await dataSource.initialize();
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
})();

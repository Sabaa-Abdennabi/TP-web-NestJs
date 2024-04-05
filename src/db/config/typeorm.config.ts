import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cv } from '../../cv/entities/cv.entity';
import { Skill } from '../../skill/entities/skill.entity';
import { User } from '../../user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

export const TypeOrmConfig: TypeOrmModuleOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: '',
  database: 'gestionnaire_cv',
  entities: [User, Skill, Cv],
  synchronize: true,
  seeds: ['src/db/seeds/**/*{.ts,.js}'],
  factories: ['src/db/factories/**/*{.ts,.js}'],
};

const dataSource = new DataSource(TypeOrmConfig as DataSourceOptions);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});

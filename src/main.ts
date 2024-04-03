import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { User } from './user/entities/user.entity';
import { TypeOrmConfig } from './db/config/typeorm.config';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  await app.close()
}
bootstrap();

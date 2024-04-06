import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import { CvModule } from './cv/cv.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Cv } from './cv/entities/cv.entity';
import { Skill } from './skill/entities/skill.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [User, Skill, Cv],
      synchronize: true,
    }),
    UserModule,
    SkillModule,
    CvModule,
  ],
})
export class AppModule {}

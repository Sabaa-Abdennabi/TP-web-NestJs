import { Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import { CvModule } from './cv/cv.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './db/config/typeorm.config';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    UserModule,
    SkillModule,
    CvModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}

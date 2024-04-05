import { Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import { CvModule } from './cv/cv.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './db/config/typeorm.config';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    UserModule,
    SkillModule,
    CvModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/v2/cv', method: RequestMethod.GET });
  }
}

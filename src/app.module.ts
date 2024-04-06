import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import { CvModule } from './cv/cv.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Cv } from './cv/entities/cv.entity';
import { Skill } from './skill/entities/skill.entity';
import { AuthMiddleware } from './cv/middlewear/auth.middleware';
import {
  MiddlewareConsumer,
  NestModule,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { Users } from './auth/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [User, Skill, Cv,Users],
      synchronize: true,
    }),
    UserModule,
    SkillModule,
    CvModule,
    AuthModule
  ],
})
export class AppModule{}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .forRoutes({ path: '/v2/cv', method: RequestMethod.GET });
//   }
// }

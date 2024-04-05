import { Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import { CvModule } from './cv/cv.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './db/config/typeorm.config';
@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    UserModule,
    SkillModule,
    CvModule,
  ],
})
export class AppModule {}

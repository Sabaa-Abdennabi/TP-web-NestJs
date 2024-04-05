import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvControllerV1 } from './cv.v1.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvRepository } from './cv.repository';
import { CvControllerV2 } from './cv.v2.controller';
import { MulterModule } from '@nestjs/platform-express';



@Module({
  imports: [
    TypeOrmModule.forFeature([CvRepository]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [CvControllerV1,CvControllerV2],
  providers: [CvService, CvRepository],
})
export class CvModule {}

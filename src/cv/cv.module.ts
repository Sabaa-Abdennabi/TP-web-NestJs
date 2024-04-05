import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvControllerV1 } from './cv.v1.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvRepository } from './cv.repository';



@Module({
  imports: [
    TypeOrmModule.forFeature([CvRepository]),
  ],
  controllers: [CvControllerV1],
  providers: [CvService, CvRepository],
})
export class CvModule {}

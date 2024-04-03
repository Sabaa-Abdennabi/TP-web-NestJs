import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvRepository } from './cv.repository';
import { Cv } from './entities/cv.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CvRepository])],
  controllers: [CvController],
  providers: [CvService,CvRepository],
})
export class CvModule {}

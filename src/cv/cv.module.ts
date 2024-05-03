import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvControllerV1 } from './cv.v1.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvRepository } from './cv.repository';
import { FileUploadService } from 'src/common/file-upload.service';

import { CvControllerV2 } from './cv.v2.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CvHistoryModule } from 'src/cvhistory/cvhistory.module';

@Module({
  imports: [TypeOrmModule.forFeature([CvRepository]), JwtModule, CvHistoryModule],
  controllers: [CvControllerV1, CvControllerV2],
  providers: [CvService, CvRepository, FileUploadService],
})
export class CvModule {}

import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvControllerV1 } from './cv.v1.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvRepository } from './cv.repository';
import { FileUploadService } from 'src/common/file-upload.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([CvRepository]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
      // Tell NestJS to serve the files under ~/uploads/
      serveRoot: '/public/',
    }),
  ],
  controllers: [CvControllerV1],
  providers: [CvService, CvRepository, FileUploadService],
})
export class CvModule {}

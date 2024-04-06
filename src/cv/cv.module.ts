import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvControllerV1 } from './cv.v1.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvRepository } from './cv.repository';
import { FileUploadService } from 'src/common/file-upload.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CvControllerV2 } from './cv.v2.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([CvRepository]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
      // Tell NestJS to serve the files under ~/uploads/
      serveRoot: '/public/',
    }),
    JwtModule
  ],
  controllers: [CvControllerV1,CvControllerV2],
  providers: [CvService, CvRepository, FileUploadService],
})
export class CvModule {}

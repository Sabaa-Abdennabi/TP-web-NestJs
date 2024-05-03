import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvHistoryService } from './cvHistory.service';
import { CvHistory } from './cvhistory.entity';
import { CvListener } from 'src/cv/cv.listener';
@Module({
  imports: [TypeOrmModule.forFeature([CvHistory])],
  providers: [CvHistoryService, CvListener]
})
export class CvHistoryModule {}

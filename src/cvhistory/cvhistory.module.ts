import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvHistoryService } from './cvhistory.service'; // Corrected import

import { CvHistory } from './cvhistory.entity';
import { CvHistoryController } from './cvhistory.controller';
import { CvHistoryRepository } from './cvhistory.repository';

@Module({
  controllers: [CvHistoryController],
  imports: [TypeOrmModule.forFeature([CvHistoryRepository])],
  providers: [CvHistoryService, CvHistoryRepository],
})
export class CvHistoryModule {}

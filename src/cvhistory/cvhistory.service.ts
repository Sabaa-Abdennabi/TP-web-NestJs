import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CvHistory } from './cvhistory.entity';

@Injectable()
export class CvHistoryService {
  constructor(
    @InjectRepository(CvHistory)
    private cvHistoryRepository: Repository<CvHistory>
  ) {}

  async recordEvent(data: any): Promise<CvHistory[]> {
    const newEvent = this.cvHistoryRepository.create(data);
    return this.cvHistoryRepository.save(newEvent);
  }
}

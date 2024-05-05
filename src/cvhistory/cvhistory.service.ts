import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CvHistory } from './cvhistory.entity';
import { NotFoundException } from '@nestjs/common';
import { CvHistoryRepository } from './cvhistory.repository';


@Injectable()
export class CvHistoryService { 
  constructor(
    @InjectRepository(CvHistoryRepository)
    private cvHistoryRepository: CvHistoryRepository
  ) {}

  async recordEvent(data: any): Promise<CvHistory[]> {
    const newEvent = this.cvHistoryRepository.create(data);
    return this.cvHistoryRepository.save(newEvent);
  }
  async findAll(): Promise<CvHistory[]> {
    return await this.cvHistoryRepository.find();
  }

 
}
export default CvHistoryService
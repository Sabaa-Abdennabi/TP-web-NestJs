import { DataSource, EntityRepository, Repository } from 'typeorm';
import { CvHistory } from './cvhistory.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
@EntityRepository(CvHistory)
export class CvHistoryRepository extends Repository<CvHistory> {
  constructor(private dataSource: DataSource) {
    super(CvHistory, dataSource.createEntityManager());
  }

  async findAll(): Promise<CvHistory[]> {
    return await this.find();
  }

}

import { Controller, Get, Post, Body, Param, Patch, Delete, Query, ValidationPipe } from '@nestjs/common';
import { CvHistoryService } from './cvhistory.service';
import { CvHistory } from './cvhistory.entity';


@Controller('cvhistory')
export class CvHistoryController {
  constructor(private readonly cvHistoryService: CvHistoryService) {}

  @Get('')
  async findAll() :Promise<CvHistory[]> {
    return await this.cvHistoryService.findAll();
  }

  
}

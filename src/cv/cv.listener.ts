import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CvHistoryService } from 'src/cvhistory/cvHistory.service';

@Injectable()
export class CvListener {
  constructor(private cvHistoryService: CvHistoryService) {}

  @OnEvent('cv.added')
  async handleCvAdded(eventData: any) {
    await this.cvHistoryService.recordEvent({
      cvId: eventData.cv.id,
      actionType: 'create',
      performedBy: eventData.actionBy,
      date: eventData.date
    });
  }

  @OnEvent('cv.updated')
  async handleCvUpdated(eventData: any) {
    await this.cvHistoryService.recordEvent({
      cvId: eventData.cv.id,
      actionType: 'update',
      performedBy: eventData.actionBy,
      date: eventData.date
    });
  }

  @OnEvent('cv.deleted')
  async handleCvDeleted(eventData: any) {
    await this.cvHistoryService.recordEvent({
      cvId: eventData.cvId,
      actionType: 'delete',
      performedBy: eventData.actionBy,
      date: eventData.date
    });
  }
}

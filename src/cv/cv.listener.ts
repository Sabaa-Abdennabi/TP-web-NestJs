import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import CvHistoryService from 'src/cvhistory/cvhistory.service';



@Injectable()
export class CvListener {
  constructor(private cvHistoryService: CvHistoryService) {}

  @OnEvent('cv.added')
  async handleCvAdded(eventData: any) {
    if (eventData.cv) {
      console.log("cvlistener1");
      await this.cvHistoryService.recordEvent({
        cv: eventData.cv,
        type: 'create',
        date: eventData.date,
        actionBy: eventData.actionBy
      });
      console.log(eventData)
    } else {
      console.log(eventData);
      console.error('pas de cv :////');
    }
  }

  @OnEvent('cv.updated')
  async handleCvUpdated(eventData: any) {
    console.log("cvlistener2");
    await this.cvHistoryService.recordEvent({
      cv: eventData.cv,
      type: 'update',
      date: eventData.date,
      actionBy: eventData.actionBy
    });
  }

  @OnEvent('cv.deleted')
  async handleCvDeleted(eventData: any) {
    console.log("cvlistener3");
    await this.cvHistoryService.recordEvent({
      cv: eventData.cv,
      type: 'delete',
      performedBy: eventData.actionBy,
      date: eventData.date,
      actionBy: eventData.actionBy
    });
  }
}
export default CvListener
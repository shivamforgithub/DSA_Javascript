import { Injectable } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ENV_PARAMS } from '../../../config/default';

@Injectable()
export class PartnerGatewayNotificationService extends NotificationService {
  constructor() {
    super(ENV_PARAMS.parterGatewayFifoSnsTopicArn);
  }
}

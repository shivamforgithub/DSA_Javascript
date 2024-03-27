import * as newRelic from 'newrelic';
import { SQSClient } from '@aws-sdk/client-sqs';
import { ENV_PARAMS } from '../../../config/default';
import { Logger } from '../logger/logger.service';
import { PARTNER_GATEWAY_EVENTS } from '../enums/common.enum';
const { Consumer } = require('sqs-consumer');
import rTracer = require('cls-rtracer');

const MAX_TRY_COUNT = 5;

const sqs = new SQSClient({ region: ENV_PARAMS.awsRegion });

export interface IDelegatorService {
  delegate(data: any): Promise<void>;
}

export class PartnerGatewayDLQueueConsumerService {
  private readonly logNameSpace = `Service.${PartnerGatewayDLQueueConsumerService.name}`;

  constructor(
    private queueUrl: string,
    private numberOfConsumerInstance: number,
    private delegatorService: IDelegatorService,
  ) {
    for (let count = 0; count < this.numberOfConsumerInstance; count++) {
      const sqsConsumer = Consumer.create({
        sqs,
        queueUrl: this.queueUrl,
        attributeNames: ['ApproximateReceiveCount'],
        handleMessage: async (message) => {
          await rTracer.runWithId(() => {
            return this.messageHandler(message);
          });
        },
      });
      sqsConsumer.start();
    }
  }

  private async messageHandler(message) {
    Logger.info(
      `DLQ consumer service start processing for message with body :  ${message.Body}`,
    );
    const messageBody = JSON.parse(message.Body);
    if (messageBody.Type === 'Notification') {
      const messageDetails = JSON.parse(messageBody.Message);
      if (!messageDetails?.eventType) {
        Logger.warn(`Unhandled event: ${message.MessageId}`);
        return;
      }
      const { eventPayload } = messageDetails || {};
      const eventDataForDelegate = {
        eventType: messageDetails.eventType,
        eventPayload: eventPayload,
      };
      try {
        await newRelic.startBackgroundTransaction(
          `dlq-event: ${messageDetails.eventType}`,
          () => {
            return this.delegatorService.delegate(eventDataForDelegate);
          },
        );
      } catch (err) {
        const receiveCount = parseInt(
          message.Attributes.ApproximateReceiveCount,
        );

        if (receiveCount >= MAX_TRY_COUNT) {
          const eventDataForDelegate = {
            eventType: PARTNER_GATEWAY_EVENTS.PERSIST_FAILED_EVENT,
            eventPayload: {
              eventPayload: eventPayload,
              auditType: messageDetails.eventType,
              error: err.toString(),
            },
          };
          await this.delegatorService.delegate(eventDataForDelegate);
          return;
        }
        Logger.error(this.logNameSpace, err);
        newRelic.noticeError(err, false);
        throw err;
      }
    }
    Logger.info(`End Processing for message`);
  }
}

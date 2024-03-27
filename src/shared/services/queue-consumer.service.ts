import { SQSClient } from '@aws-sdk/client-sqs';
import { ENV_PARAMS } from '../../../config/default';
import { Logger } from '../logger/logger.service';
const { Consumer } = require('sqs-consumer');
import rTracer = require('cls-rtracer');
import { QueueDelegatorEvent } from '../models/queue-delegator-event.model';
import { v4 as uuidv4 } from 'uuid';
import {
  distributedTracingNamespace,
  setTracingId,
} from '../middlewares/distributed-tracing-middleware';
import * as newRelic from 'newrelic';

const sqs = new SQSClient({ region: ENV_PARAMS.awsRegion });

export interface IDelegatorService {
  delegate(data: any): Promise<void>;
}

export class QueueConsumerService {
  private readonly logNameSpace = `Service.${QueueConsumerService.name}`;

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
          await distributedTracingNamespace.runAndReturn(async () => {
            const messageBody = JSON.parse(message.Body);
            setTracingId(
              messageBody?.MessageAttributes?.xTracingId?.Value || uuidv4(),
            );
            await rTracer.runWithId(() => {
              return this.messageHandler(message);
            });
          });
        },
      });

      sqsConsumer.start();
    }
  }

  private async messageHandler(message) {
    try {
      Logger.info(`Start Processing for message with body : ${message.Body} }`);
      const messageBody = JSON.parse(message.Body);
      if (messageBody.Type === 'Notification') {
        const messageDetails = JSON.parse(messageBody.Message);
        if (!messageDetails?.eventType) {
          Logger.warn(`Unhandled event: ${message.MessageId}`);
          return;
        }

        const { eventPayload } = messageDetails || {};

        const currentEventProcessingCount = parseInt(
          message.Attributes.ApproximateReceiveCount,
        );

        const delegatorEventPayload = eventPayload
          ? JSON.parse(eventPayload)
          : {};

        const eventDataForDelegate: QueueDelegatorEvent = {
          eventType: messageDetails.eventType,
          eventPayload: delegatorEventPayload,
          currentEventProcessingCount,
          messageId: message.MessageId,
        };

        const eventDataType = `event-${messageDetails.eventType}`;

        await newRelic.startBackgroundTransaction(eventDataType, () => {
          return this.delegatorService.delegate(eventDataForDelegate);
        });
      }
      Logger.info(`End Processing for message`);
    } catch (err) {
      Logger.error(`${this.logNameSpace}.Queue.messageHandler`, err);
      newRelic.noticeError(err, false);
      throw err;
    }
  }
}

import { PublishCommand, PublishInput, SNSClient } from '@aws-sdk/client-sns';
import { Logger } from '@nestjs/common';
import { ENV_PARAMS } from '../../../config/default';
import { getTracingId } from '../middlewares/distributed-tracing-middleware';

export class NotificationService {
  private snsClient: SNSClient = new SNSClient({
    region: ENV_PARAMS.awsRegion,
  });

  constructor(private topicArn: string) {}

  async send(
    eventType: string,
    eventPayload: string,
    doNotAddTraceId: boolean = false,
  ) {
    Logger.log(
      `Sending notification, message: ${eventPayload}, eventType: ${eventType}`,
    );
    const messageAttributes = doNotAddTraceId
      ? {}
      : {
          xTracingId: {
            DataType: 'String',
            StringValue: getTracingId(),
          },
        };
    const publishInput: PublishInput = {
      TopicArn: this.topicArn,
      Message: JSON.stringify({
        eventPayload,
        eventType,
      }),
      MessageAttributes: {
        ...messageAttributes,
        eventType: {
          DataType: 'String',
          StringValue: eventType,
        },
      },
    };

    const command = new PublishCommand(publishInput);
    const response = await this.snsClient.send(command);
    Logger.log(
      `Notification sent, message id: ${response.MessageId} : ${JSON.stringify(
        response,
      )}`,
    );
  }
}

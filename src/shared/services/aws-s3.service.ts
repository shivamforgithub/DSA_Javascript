import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { ENV_PARAMS } from '../../../config/default';
import { Logger } from '../logger/logger.service';
import { getLogNameSpace } from '../helpers/common.helper';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import axios from 'axios';
import { CustomHttpService } from './custom-http.service';

const s3Client = new S3Client({
  region: ENV_PARAMS.awsRegion,
});

export class AwsS3Service {
  private readonly logNameSpace = getLogNameSpace(AwsS3Service);
  private readonly httpService = new CustomHttpService();

  constructor(private bucketName: string) {}

  async uploadFileToS3(file: Buffer, fileName: string) {
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: file,
    };
    const command = new PutObjectCommand(params);

    try {
      await s3Client.send(command);
      Logger.info(`${this.logNameSpace}.uploadFileToS3.success`);
    } catch (error) {
      Logger.error(`${this.logNameSpace}`, error);
      throw error;
    }
  }

  async uploadJsObjAsJsonToS3(jsonData: Record<any, any>, fileName: string) {
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: JSON.stringify(jsonData, null, 2),
      ContentType: 'application/json',
    };
    const command = new PutObjectCommand(params);

    try {
      await s3Client.send(command);
      Logger.info(`${this.logNameSpace}.uploadJsObjAsJsonToS3.success`);
    } catch (error) {
      Logger.error(`${this.logNameSpace}`, error);
      throw error;
    }
  }

  async uploadFromUrl(url: string, fileName: string) {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    const arrayBuffer = response.data;

    const uploadParams = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: new Uint8Array(arrayBuffer),
      ContentType: response.headers['content-type'],
    };

    const command = new PutObjectCommand(uploadParams);

    try {
      const result = await s3Client.send(command);
      Logger.info(`${this.logNameSpace}.uploadFromUrl.success`);
    } catch (error) {
      Logger.error(this.logNameSpace, error);
      throw error;
    }
  }

  async getSignedUrl(
    fileName: string,
    downloadFileName: string | null = null,
    expirationTimeInSeconds: number = 60 * 60,
  ): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
      ...(downloadFileName && {
        ResponseContentDisposition: `attachment; filename="${downloadFileName}"`,
      }),
    };
    const command = new GetObjectCommand(params);

    try {
      const url = await getSignedUrl(s3Client, command, {
        expiresIn: expirationTimeInSeconds,
      });
      return url;
    } catch (error) {
      Logger.error(`${this.logNameSpace}.uploadFromUrl`, error);
      throw error;
    }
  }

  async getFile(filename: string) {
    const params = {
      Bucket: this.bucketName,
      Key: filename,
    };
    const command = new GetObjectCommand(params);

    try {
      const response = await s3Client.send(command);
      const fileBuffer = response.Body.transformToByteArray();
      Logger.info(`${this.logNameSpace}.getFile.success`);
      return fileBuffer;
    } catch (error) {
      Logger.error(`${this.logNameSpace}.getFile.error`, error);
      throw error;
    }
  }
}

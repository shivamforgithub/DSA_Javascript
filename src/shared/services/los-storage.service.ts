import { Injectable } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import { ENV_PARAMS } from '../../../config/default';

class ObjectStorageService extends AwsS3Service {
  constructor() {
    super(ENV_PARAMS.awsS3LosBucket);
  }
}

export const LosObjectStorageService = new ObjectStorageService();

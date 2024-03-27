import { Injectable } from '@nestjs/common';
import retry = require('async-retry');
import { FINFLUX_AUTH_TOKEN_URL } from '../constants/finflux.contants';
import {
  CustomAxiosRequestConfig,
  CustomHttpService,
} from './custom-http.service';
import axios, { AxiosRequestConfig } from 'axios';
import { Logger } from '../logger/logger.service';
import { ENV_PARAMS } from '../../../config/default';
import { RedisService } from './redis.service';
import { CustomHttpException } from '../exceptions/custom-http.exception';
const fs = require('fs');
const stream = require('stream');

const util = require('util');
const pipeline = util.promisify(stream.pipeline);
export interface AuthToken {
  access_token: string;
  refresh_token: string;
  token_type: string;
  scope: string;
}

type RedisTokenValueType = {
  accessToken: string;
  expireIn: string;
};

const FINFLUX_TOKEN_REDIS_KEY = 'finflux-token';
const FINFLUX_TOKEN_REDIS_LOCK_KEY = 'finflux-token-lock';

@Injectable()
export class FinfluxHttpService {
  private readonly logNameSpace = `Service.${FinfluxHttpService.name}`;

  constructor(private readonly httpInstance: CustomHttpService) {}

  public async getToken() {
    const tokenString = await RedisService.getKey(FINFLUX_TOKEN_REDIS_KEY);
    if (tokenString) {
      const { accessToken, expireIn }: RedisTokenValueType =
        JSON.parse(tokenString);
      const expireInDate = new Date(expireIn);
      if (accessToken && expireInDate > new Date()) {
        return accessToken;
      }
    }

    const newAccessToken = await this.generateToken();
    return newAccessToken;
  }

  private async generateToken() {
    Logger.info('Generating Finflux token');

    let lock;
    try {
      lock = await RedisService.acquireLockOnKey(
        FINFLUX_TOKEN_REDIS_LOCK_KEY,
        5000,
      );

      const res: { access_token: string; expires_in: number } =
        await this.httpInstance.post(
          `${ENV_PARAMS.finfluxBaseUrl}${FINFLUX_AUTH_TOKEN_URL}`,
          {
            username: ENV_PARAMS.finfluxUser,
            password: ENV_PARAMS.finfluxPassword,
            client_id: 'community-app',
            grant_type: 'password',
            client_secret: ENV_PARAMS.finfluxClientSecret,
            isPasswordEncrypted: 'false',
          },
        );

      const now = new Date();
      // Subtracted 300 secs from expiry to be on safe side to generate token early before expiry
      now.setSeconds(now.getSeconds() + (res.expires_in - 300));

      await RedisService.setKey(
        FINFLUX_TOKEN_REDIS_KEY,
        JSON.stringify({
          accessToken: res.access_token,
          expireIn: now.toString(),
        }),
      );
      Logger.info('Generated Finflux token');

      return res.access_token;
    } catch (err) {
      Logger.error('generateToken.failed', err);
    } finally {
      if (lock) {
        await RedisService.releaseLock(lock);
      }
    }
  }

  async get(
    url: string,
    requestConfig?: CustomAxiosRequestConfig,
  ): Promise<any> {
    const getWithRetry = async () => {
      const token = await this.getToken();

      requestConfig = requestConfig || {};
      requestConfig.headers = requestConfig.headers || {};
      requestConfig.headers['Authorization'] = `Bearer ${token}`;

      const apiUrl = ENV_PARAMS.finfluxBaseUrl + url;
      return this.httpInstance.get(apiUrl, requestConfig);
    };

    return await this.retryMethodForTokenExpiry(getWithRetry);
  }

  async post(
    url: string,
    payload: any,
    requestConfig?: CustomAxiosRequestConfig,
  ) {
    const postWithRetry = async () => {
      const token = await this.getToken();

      requestConfig = requestConfig || {};
      requestConfig.headers = requestConfig.headers || {};
      requestConfig.headers['Content-Type'] =
        requestConfig.headers['Content-Type'] || 'application/json';
      requestConfig.headers['Fineract-Platform-TenantId'] =
        ENV_PARAMS.finfluxTenantId;
      requestConfig.headers['Authorization'] = `Bearer ${token}`;

      const apiUrl = ENV_PARAMS.finfluxBaseUrl + url;

      return await this.httpInstance.post(apiUrl, payload, requestConfig);
    };

    return this.retryMethodForTokenExpiry(postWithRetry);
  }

  async put(
    url: string,
    payload: any,
    requestConfig?: AxiosRequestConfig,
    doNotLogResponse: boolean = false,
    doNotLogPayload: boolean = false,
  ) {
    const putWithRetry = async () => {
      const token = await this.getToken();

      requestConfig = requestConfig || {};
      requestConfig.headers = requestConfig.headers || {};
      requestConfig.headers['Content-Type'] =
        requestConfig.headers['Content-Type'] || 'application/json';
      requestConfig.headers['Fineract-Platform-TenantId'] =
        ENV_PARAMS.finfluxTenantId;
      requestConfig.headers['Authorization'] = `Bearer ${token}`;

      const apiUrl = ENV_PARAMS.finfluxBaseUrl + url;

      return await this.httpInstance.put(apiUrl, payload, requestConfig);
    };

    return this.retryMethodForTokenExpiry(putWithRetry);
  }

  async delete(url: string, requestConfig?: AxiosRequestConfig) {
    const deleteWithRetry = async () => {
      const token = await this.getToken();

      requestConfig = requestConfig || {};
      requestConfig.headers = requestConfig.headers || {};
      requestConfig.headers['Content-Type'] =
        requestConfig.headers['Content-Type'] || 'application/json';
      requestConfig.headers['Fineract-Platform-TenantId'] =
        ENV_PARAMS.finfluxTenantId;
      requestConfig.headers['Authorization'] = `Bearer ${token}`;

      const apiUrl = ENV_PARAMS.finfluxBaseUrl + url;

      return this.httpInstance.delete(apiUrl, requestConfig);
    };

    return this.retryMethodForTokenExpiry(deleteWithRetry);
  }

  async uploadDocument(
    url: string,
    file: Express.Multer.File,
    payload: FormData | any,
    requestConfig?: CustomAxiosRequestConfig,
  ) {
    payload.append('file', file.buffer, file.originalname);

    const headers = {
      ...requestConfig?.headers,
      'Content-Type': 'multipart/form-data',
    };

    requestConfig = { ...requestConfig, headers };

    return await this.post(url, payload, requestConfig);
  }

  async retryMethodForTokenExpiry(retryFunction: () => any): Promise<any> {
    try {
      return await retry(
        async (bail, retryCount) => {
          Logger.info(`${this.logNameSpace}.retryMethod.retrying`, {
            retryCount: retryCount - 1,
          });
          try {
            const res = await retryFunction();
            return res;
          } catch (err) {
            err = JSON.parse(JSON.stringify(err));
            if (err.status === 401) {
              throw err;
            } else {
              bail(err);
            }
          }
        },
        {
          retries: 3,
          minTimeout: 3000,
          factor: 1,
        },
      );
    } catch (error) {
      Logger.error(`${this.logNameSpace}.retryMethod.failed`, error);
      throw error;
    }
  }

  async getFileBufferFromDownloadLink(downloadUrl: string): Promise<Buffer> {
    const headers = {
      Authorization: `Bearer ${await this.getToken()}`,
    };

    return axios({
      url: downloadUrl,
      method: 'GET',
      headers,
      responseType: 'arraybuffer',
    })
      .then((response) => {
        if (response.data instanceof Buffer) {
          return response.data;
        } else if (response.data instanceof ArrayBuffer) {
          return Buffer.from(response.data);
        } else {
          throw new Error('Unexpected response data type');
        }
      })
      .catch((error) => {
        Logger.error(
          `${this.logNameSpace}.getFileBufferFromDownloadLink.failed`,
          error,
        );
        throw new Error('Failed to download file from the service.');
      });
  }
}

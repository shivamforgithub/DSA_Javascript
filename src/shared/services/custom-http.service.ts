import { HttpStatus, Injectable } from '@nestjs/common';
// import { HttpService } from '@nestjs/axios';

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  AADHAAR_URLS,
  sensitiveAadhaarMaskConfig,
} from '../helpers/maskdata.helper';
import { Logger } from '../logger/logger.service';
import { CustomHttpException } from '../exceptions/custom-http.exception';
import { getTracingId } from '../middlewares/distributed-tracing-middleware';
import { TRACING_ID_HEADER_KEY } from '../constants/common.constant';

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  doNotLogResponse?: boolean;
  doNotLogPayload?: boolean;
}
@Injectable()
export class CustomHttpService {
  // constructor(private readonly httpService: HttpService) {}
  constructor() {}
  private readonly logNameSpace = `Service.${CustomHttpService.name}`;

  async put(
    url: string,
    payload: any,
    requestConfig?: AxiosRequestConfig,
    doNotLogResponse: boolean = false,
    doNotLogPayload: boolean = false,
  ) {
    requestConfig = requestConfig || {};
    requestConfig.headers = requestConfig.headers || {};
    requestConfig.headers['Content-Type'] =
      requestConfig.headers['Content-Type'] || 'application/json';
    requestConfig.headers[TRACING_ID_HEADER_KEY] = getTracingId();
    Logger.info(`${this.logNameSpace}.put.started`, {
      url,
      payload: doNotLogPayload ? undefined : payload,
      requestConfig,
    });

    return await axios
      .put(url, payload, requestConfig)
      .then((response: AxiosResponse) => {
        Logger.info(`${this.logNameSpace}.put.success`, {
          responseData: doNotLogResponse ? undefined : response.data,
        });

        return response.data;
      })
      .catch((error: AxiosError) => {
        this.handleAxiosError(`${this.logNameSpace}.put.failed`, error);
      });
  }

  async post(
    url: string,
    payload: any,
    requestConfig?: CustomAxiosRequestConfig,
  ) {
    requestConfig = requestConfig || {};
    requestConfig.headers = requestConfig.headers || {};
    requestConfig.headers['Content-Type'] =
      requestConfig.headers['Content-Type'] || 'application/json';
    requestConfig.headers[TRACING_ID_HEADER_KEY] = getTracingId();

    if (requestConfig?.doNotLogPayload) {
      Logger.info(`${this.logNameSpace}.post.started`, {
        url,
        requestConfig,
      });
    } else {
      Logger.info(`${this.logNameSpace}.post.started`, {
        url,
        payload,
        requestConfig,
      });
    }

    try {
      const response = await axios.post(url, payload, requestConfig);

      if (requestConfig?.doNotLogResponse) {
        Logger.info(`${this.logNameSpace}.post.success`, {
          responseData: '',
        });
      } else {
        Logger.info(`${this.logNameSpace}.post.success`, {
          responseData: response.data,
        });
      }
      return response.data;
    } catch (error) {
      const isAadhaarUrls = AADHAAR_URLS.some((value) => url.includes(value));
      if (isAadhaarUrls && error?.config?.data) {
        let maskedData = JSON.parse(error.config.data);
        const sensitiveAadhaarDetails = sensitiveAadhaarMaskConfig();
        sensitiveAadhaarDetails.forEach((info) => {
          if (url?.match(info.urlRegex)) {
            maskedData = info.maskUtility(maskedData, info.maskOptions);
          }
        });
        error.config.data = maskedData;
      }
      if (error?.response?.status === 503) {
        throw new CustomHttpException(
          'Service Unavailable',
          HttpStatus.SERVICE_UNAVAILABLE,
          null,
          this.logNameSpace,
          'ERR_SERVICE_UNAVAILABLE',
        );
      }
      this.handleAxiosError(`${this.logNameSpace}.post.failed`, error);
    }
  }

  async patch(
    url: string,
    payload: any,
    requestConfig?: AxiosRequestConfig,
    doNotLogResponse: boolean = false,
    doNotLogPayload: boolean = false,
  ) {
    requestConfig = requestConfig || {};
    requestConfig.headers = requestConfig.headers || {};
    requestConfig.headers['Content-Type'] =
      requestConfig.headers['Content-Type'] || 'application/json';
    requestConfig.headers[TRACING_ID_HEADER_KEY] = getTracingId();
    Logger.info(`${this.logNameSpace}.patch.started`, {
      url,
      payload: doNotLogPayload ? undefined : payload,
      requestConfig,
    });

    return await axios
      .patch(url, payload, requestConfig)
      .then((response: AxiosResponse) => {
        Logger.info(`${this.logNameSpace}.patch.success`, {
          responseData: doNotLogResponse ? undefined : response.data,
        });

        return response.data;
      })
      .catch((error: AxiosError) => {
        this.handleAxiosError(`${this.logNameSpace}.patch.failed`, error);
      });
  }

  async get(url: string, requestConfig?: CustomAxiosRequestConfig) {
    requestConfig = requestConfig || {};
    requestConfig.headers = requestConfig.headers || {};
    requestConfig.headers[TRACING_ID_HEADER_KEY] = getTracingId();
    Logger.info(`${this.logNameSpace}.get.started`, { url, requestConfig });

    return await axios
      .get(url, requestConfig)
      .then((response: AxiosResponse) => {
        const logMetaData: any = {};

        if (requestConfig?.doNotLogResponse) {
          logMetaData.responseData = '';
        } else {
          logMetaData.responseData = response.data;
        }

        Logger.info(`${this.logNameSpace}.get.success`, logMetaData);
        return response.data;
      })
      .catch((error: AxiosError) => {
        this.handleAxiosError(`${this.logNameSpace}.get.failed`, error);
      });
  }

  async delete(
    url: string,
    requestConfig?: AxiosRequestConfig,
    doNotLogResponse: boolean = false,
  ) {
    requestConfig = requestConfig || {};
    requestConfig.headers = requestConfig.headers || {};
    requestConfig.headers['Content-Type'] =
      requestConfig.headers['Content-Type'] || 'application/json';
    requestConfig.headers[TRACING_ID_HEADER_KEY] = getTracingId();
    Logger.info(`${this.logNameSpace}.delete.started`, {
      url,
      requestConfig,
    });

    return await axios
      .delete(url, requestConfig)
      .then((response: AxiosResponse) => {
        Logger.info(`${this.logNameSpace}.delete.success`, {
          responseData: doNotLogResponse ? undefined : response.data,
        });

        return response.data;
      })
      .catch((error: AxiosError) => {
        this.handleAxiosError(`${this.logNameSpace}.delete.failed`, error);
      });
  }

  private handleAxiosError(namespace: string, error: AxiosError) {
    Logger.error(namespace, error, {
      responseData: error.response?.data,
      responseStatus: error.response?.status,
      errorCode: error.code,
    });
    throw error;
  }
}

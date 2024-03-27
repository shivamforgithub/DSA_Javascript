import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

import { Response } from 'express';

import { customHttpExceptionFormatter } from '../utils/custom-http-exception-formatter.util';
import { CustomHttpException } from '../exceptions/custom-http.exception';

@Catch(CustomHttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {
  public catch(exception: CustomHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const formattedError = customHttpExceptionFormatter(exception);
    response.status(status).json(formattedError);
  }
}

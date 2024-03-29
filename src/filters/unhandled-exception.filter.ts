import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
    HttpException,
  } from '@nestjs/common';
  
  import { Logger } from '../logger/logger.service';
  import { CustomHttpException } from '../exceptions/custom-http.exception';
  import { ResponseMessages } from '../constants/response-messages.constants';
  import { ResponseModel } from '../models/response.model';
  import { CustomHttpExceptionFilter } from './custom-http-exception.filter';
  
  @Catch()
  export class UnhandledExceptionFilter implements ExceptionFilter {
    private logNameSpace = `Filters.${CustomHttpExceptionFilter.name}`;
  
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
  
      if (exception instanceof CustomHttpException) {
        Logger.warn(exception.logNameSpace, { data: exception });
  
        return response
          .status(exception.httpCode)
          .json(
            new ResponseModel(
              exception.data,
              exception.httpCode,
              exception.message,
            ),
          );
      }
  
      if (exception instanceof HttpException) {
        const exceptionCopy = exception as any;
  
        Logger.error(exceptionCopy, '', `${this.logNameSpace}.httpException`);
  
        if (exceptionCopy.status === HttpStatus.NOT_FOUND) {
          return response
            .status(HttpStatus.NOT_FOUND)
            .json(
              new ResponseModel(
                null,
                ResponseMessages.NOT_FOUND.code,
                ResponseMessages.NOT_FOUND.message,
              ),
            );
        }
  
        if (exceptionCopy.status === HttpStatus.BAD_REQUEST) {
          return response
            .status(HttpStatus.BAD_REQUEST)
            .json(
              new ResponseModel(
                exceptionCopy.data,
                exceptionCopy.code,
                exceptionCopy.message,
              ),
            );
        }
      }
  
      Logger.error(
        `${this.logNameSpace}.internalServerError`,
        '',
        exception as object,
      );
  
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new ResponseModel(
            null,
            ResponseMessages.SERVER_ERROR.code,
            ResponseMessages.SERVER_ERROR.message,
          ),
        );
    }
  }
  
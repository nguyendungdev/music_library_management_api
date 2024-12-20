import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { ILog } from '../logger/log.interface';
import { CommonLogger } from '../logger/common-logger';

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter {
  private logger = new CommonLogger('HttpExceptionFilter');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const thisLog: ILog = {
      endpoint: request.path,
      ipAddress: request.connection.remoteAddress,
      method: request.method,
      error: exception,
    };

    this.logger.customError(exception.message, exception.stack, thisLog);

    super.catch(exception, host);
  }
}
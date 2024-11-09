import { HttpException } from '@nestjs/common';
import { MulterError } from 'multer';

export interface ILog {
  endpoint: string;
  method: string;
  ipAddress: string;
  message?: string;
  data?: object;
  error?: HttpException | MulterError;
}

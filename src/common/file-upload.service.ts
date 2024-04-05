// file-upload.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { multerConfig } from './multer.config';
import { diskStorage } from 'multer';

@Injectable()
export class FileUploadService {
  async uploadFile(file) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return file.filename;
  }
}

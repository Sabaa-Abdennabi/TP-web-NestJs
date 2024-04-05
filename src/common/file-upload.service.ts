// file-upload.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  async uploadFile(file) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return file.filename;
  }
}

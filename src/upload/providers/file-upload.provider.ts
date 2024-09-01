import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
// import * as path from 'path';

@Injectable()
export class FileUploadProvider {
  async uploadFIle(file: Express.Multer.File) {
    // code to upload file in S3 or you server.
    const fileName = this.generateFileName(file);

    return {
      name: fileName,
      path: 'http://example.domain/file/',
      mime: file.mimetype,
      size: file.size,
    };
  }

  private generateFileName(file: Express.Multer.File) {
    const [name, ext] = file.originalname.split('.');

    name.replace(/\s/g, '');

    // const extension = path.extname(file.originalname);
    const timeStamp = new Date().getTime().toString().trim();

    return `${name}-${timeStamp}-${randomUUID()}.${ext}}`;
  }
}

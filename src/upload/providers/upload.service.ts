import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { FileUploadProvider } from './file-upload.provider';
import { Repository } from 'typeorm';
import { Upload } from '../upload.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UploadService {
  constructor(
    /**
     * Inject FileUploadProvider
     */
    private readonly fileUploadProvider: FileUploadProvider,

    /**
     * Inject upload Repository
     */
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
  ) {}
  async uploadFile(file: Express.Multer.File) {
    // validate for supported file.
    if (
      !['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(
        file.mimetype,
      )
    ) {
      throw new BadRequestException('MIME type not supported');
    }

    //upload file to storage
    const result = await this.fileUploadProvider.uploadFIle(file);

    //store file meta to DB
    try {
      const createdFile = this.uploadRepository.create(result);
      return await this.uploadRepository.save<Upload>(createdFile);
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }
}

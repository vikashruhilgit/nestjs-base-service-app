import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiHeaders, ApiOperation } from '@nestjs/swagger';
import { UploadService } from './providers/upload.service';

@Controller('upload')
export class UploadController {
  constructor(
    /**
     * Inject Upload service
     */
    private readonly uploadService: UploadService,
  ) {}
  /**
   * File upload controller example
   */
  @Post('file')
  @ApiHeaders([
    {
      name: 'Content-Type',
      description: 'multipart/form-data',
    },
  ])
  @ApiOperation({
    description: 'Upload image to the server',
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadFile(file);
  }
}

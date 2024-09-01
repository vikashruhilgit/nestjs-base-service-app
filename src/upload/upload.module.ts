import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './providers/upload.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}

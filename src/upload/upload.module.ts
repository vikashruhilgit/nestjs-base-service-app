import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './providers/upload.service';
import { FileUploadProvider } from './providers/file-upload.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './upload.entity';

@Module({
  controllers: [UploadController],
  providers: [UploadService, FileUploadProvider],
  imports: [TypeOrmModule.forFeature([Upload])],
})
export class UploadModule {}

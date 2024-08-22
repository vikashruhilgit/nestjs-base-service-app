import { PartialType } from '@nestjs/mapped-types';
import { CreateExampleDTO } from './create-example.dto';
import { ExampleStatus } from '../example.model';
import { IsEnum } from 'class-validator';

export class PatchExampleDTO extends PartialType(CreateExampleDTO) {
  @IsEnum(ExampleStatus)
  status: ExampleStatus;
}

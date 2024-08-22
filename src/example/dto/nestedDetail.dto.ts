import { IsOptional, IsString } from 'class-validator';

export class NestedDetailDTO {
  @IsOptional()
  @IsString()
  detail1: string;
}

import { IsOptional, IsString } from 'class-validator';

export class NestedDetail {
  @IsOptional()
  @IsString()
  detail1: string;

  @IsOptional()
  @IsString()
  detail2: string;

  @IsOptional()
  @IsString()
  detail3: string;
}

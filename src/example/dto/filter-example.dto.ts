/* 
  class-validator:
  https://github.com/typestack/class-validator
  Description : 
  Allows use of decorator and non-decorator based validation. Internally uses validator.js to perform validation. 
  Class-validator works on both browser and node.js platforms.
*/

import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ExampleStatus } from '../example.model';
import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDTO } from 'src/common/pagination/dtos/pagination-query.dto';

export class FilterExampleBaseDTO {
  @ApiPropertyOptional({
    description: 'status for filter',
    example: '',
    enum: ExampleStatus,
  })
  @IsOptional()
  @IsEnum(ExampleStatus)
  status?: ExampleStatus;

  @ApiPropertyOptional({
    description: 'search term fir filter',
    example: '',
  })
  @IsOptional()
  @IsNotEmpty()
  search?: string;
}

export class FilterExampleDTO extends IntersectionType(
  FilterExampleBaseDTO,
  PaginationQueryDTO,
) {}

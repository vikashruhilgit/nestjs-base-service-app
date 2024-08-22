/* 
  class-validator:
  https://github.com/typestack/class-validator
  Description : 
  Allows use of decorator and non-decorator based validation. Internally uses validator.js to perform validation. 
  Class-validator works on both browser and node.js platforms.
*/

import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ExampleStatus } from '../example.model';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterExampleDTO {
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

  @ApiPropertyOptional({
    description: 'page no used in pagination',
    example: 1,
  })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({
    description: 'page limit no used in pagination',
    example: 1,
  })
  @IsOptional()
  limit?: number;
}

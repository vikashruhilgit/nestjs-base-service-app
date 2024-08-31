/* 
  class-validator:
  https://github.com/typestack/class-validator
  Description : 
  Allows use of decorator and non-decorator based validation. Internally uses validator.js to perform validation. 
  Class-validator works on both browser and node.js platforms.
*/

import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { UserStatus } from '../user.model';
import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDTO } from 'src/common/pagination/dtos/pagination-query.dto';

class FilterUserBaseDTO {
  @ApiPropertyOptional({
    description: 'User status for filter',
    example: '',
    enum: UserStatus,
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiPropertyOptional({
    description: 'search term for user, first name or last name',
    example: '',
  })
  @IsOptional()
  @IsNotEmpty()
  search?: string;
}

export class FilterUserDTO extends IntersectionType(
  FilterUserBaseDTO,
  PaginationQueryDTO,
) {}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDTO {
  @ApiPropertyOptional({
    description: 'page no used in pagination',
    example: 1,
  })
  @IsOptional()
  @IsPositive()
  limit?: number = 1;

  @ApiPropertyOptional({
    description: 'page limit no used in pagination',
    example: 1,
  })
  @IsOptional()
  @IsPositive()
  page?: number = 1;
}

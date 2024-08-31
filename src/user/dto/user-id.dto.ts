import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';

// import { Type } from 'class-transformer';

export class UserIdDTO {
  @ApiProperty({
    description: 'property description',
    example: randomUUID(),
  })
  @IsString()
  @IsUUID()
  // @Type(() => Number) /* this is used to transform id to number just like ParseToNumberPipe  */
  id: string;
}

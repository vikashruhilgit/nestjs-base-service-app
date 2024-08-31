/* 
  class-validator:
  https://github.com/typestack/class-validator
  Description : 
  Allows use of decorator and non-decorator based validation. Internally uses validator.js to perform validation. 
  Class-validator works on both browser and node.js platforms.
*/

import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { UserStatus } from '../user.model';
import { NestedDetail } from './nestedDetail.dto';
import { Type } from 'class-transformer';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  firstName: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/, {
    message:
      'Minimum eight characters, at least one letter, one number and one special character',
  })
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(96)
  email: string;

  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus = UserStatus.IN_ACTIVE;

  /* Example to test nested */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NestedDetail)
  addressDetail?: NestedDetail[];
}

/**
 * 
 * validator topical example  
 * // For Documentation refer url: https://docs.nestjs.com/openapi/types-and-parameters
import { postStatus } from '../enums/post-status.enum';
import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';
import { PostType } from '../enums/post-type.enum';

export class CreatePostDto {
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @IsEnum(PostType)
  @IsNotEmpty()
  postType: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  slug: string;

  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsJSON()
  schema: string;

  @IsOptional()
  @IsUrl()
  featuredImageUrl: string;

  @IsISO8601()
  @IsOptional()
  publishOn: Date;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags: string[];

  metaOptions: [{ key: 'sidebarEnabled'; value: false }];
}
 * 
 * 
 */

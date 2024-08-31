/* 
  class-validator:
  https://github.com/typestack/class-validator
  Description : 
  Allows use of decorator and non-decorator based validation. Internally uses validator.js to perform validation. 
  Class-validator works on both browser and node.js platforms.
*/

import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateAddressDTO {
  @IsNotEmpty()
  @IsNumber()
  zip_code: number;

  @IsNotEmpty()
  @IsString()
  city?: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}

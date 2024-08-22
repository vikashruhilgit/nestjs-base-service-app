/* 
  class-validator:
  https://github.com/typestack/class-validator
  Description : 
  Allows use of decorator and non-decorator based validation. Internally uses validator.js to perform validation. 
  Class-validator works on both browser and node.js platforms.
*/

import { IsEnum } from 'class-validator';
import { ExampleStatus } from '../example.model';

export class StatusDTO {
  @IsEnum(ExampleStatus)
  status: ExampleStatus;
}

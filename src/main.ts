/* 
  Pipes:
  https://docs.nestjs.com/pipes
  Description : A pipe is a class annotated with the @Injectable() decorator, which implements the PipeTransform interface.
  
  Here "ValidationPipe" is used at app level
*/

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

/* 
  Pipes:
  https://docs.nestjs.com/pipes
  Description : A pipe is a class annotated with the @Injectable() decorator, which implements the PipeTransform interface.
  
  Here "ValidationPipe" is used at app level
*/

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // This will ensure that any additional property which are not defined in DTO are rejected.
      // forbidNonWhitelisted: true, /* This will throw an error if any additional property is sent. */
      transform: true, // this will transform the request object to DTO class.
    }),
  );

  /**
   * Swagger Configuration
   */
  const config = new DocumentBuilder()
    .setTitle('Example Base App Service')
    .setDescription('The base API url is http://localhost:3000')
    .addServer('http://localhost:3000')
    .setVersion('0.1')
    .build();

  /**
   * Instantiate Swagger
   */
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

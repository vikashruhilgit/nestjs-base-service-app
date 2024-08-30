import { forwardRef, Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './provider/example.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Example } from './example.entity';
import { ConfigModule } from '@nestjs/config';
import { exampleConfiguration } from './config/example.config';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  controllers: [ExampleController],
  providers: [ExampleService],
  exports: [ExampleService],
  imports: [
    PaginationModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Example]),
    ConfigModule.forFeature(exampleConfiguration),
  ],
})
export class ExampleModule {}

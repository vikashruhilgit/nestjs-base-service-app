import { forwardRef, Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './provider/example.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Example } from './example.entity';

@Module({
  controllers: [ExampleController],
  providers: [ExampleService],
  exports: [ExampleService],
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([Example])],
})
export class ExampleModule {}

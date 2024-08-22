import { forwardRef, Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './provider/example.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ExampleController],
  providers: [ExampleService],
  exports: [ExampleService],
  imports: [forwardRef(() => AuthModule)],
})
export class ExampleModule {}

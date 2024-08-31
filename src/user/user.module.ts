import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './providers/user.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { exampleConfiguration } from './config/example.config';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreateManyProvider } from './providers/create-many.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindUserByEmailProvider } from './providers/find-user-by-email.provider';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    CreateManyProvider,
    CreateUserProvider,
    FindUserByEmailProvider,
  ],
  exports: [UserService],
  imports: [
    PaginationModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(exampleConfiguration),
  ],
})
export class UserModule {}

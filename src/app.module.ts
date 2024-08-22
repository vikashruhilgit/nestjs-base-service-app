import { Module } from '@nestjs/common';
import { ExampleModule } from './example/example.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        entities: [],
        synchronize: true,
        username: 'postgres',
        password: 'postgres',
        database: 'nestjs-db',
        host: 'localhost',
        port: 5432,
      }),
    }),
    ExampleModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}

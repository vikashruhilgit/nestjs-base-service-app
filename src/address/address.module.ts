import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { AddressController } from './address.controller';
import { UserModule } from 'src/user/user.module';
import { AddressService } from './providers/address.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), UserModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}

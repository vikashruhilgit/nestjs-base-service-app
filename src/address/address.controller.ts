import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/providers/user.service';
import { CreateAddressDTO } from './dtos/create-address.dto';
import { Address } from './address.entity';
import { AddressService } from './providers/address.service';

@Controller('address')
export class AddressController {
  constructor(
    /**
     * Inject User Service
     */
    private readonly userService: UserService,

    /**
     * Inject Address Service
     */
    private readonly addressService: AddressService,
  ) {}

  @Post()
  create(@Body() createAddressDTO: CreateAddressDTO): Promise<Address> {
    return this.addressService.create(createAddressDTO);
  }
}

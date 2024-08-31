import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Address } from '../address.entity';
import { CreateAddressDTO } from '../dtos/create-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../../user/providers/user.service';

@Injectable()
export class AddressService {
  constructor(
    /**
     * Injecting example repository of type Example entity
     */
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    /**
     * Inject User Service
     */
    private readonly userService: UserService,
  ) {}

  public async create(createAddressDTO: CreateAddressDTO): Promise<Address> {
    let existingUser;
    try {
      existingUser = await this.userService.findByID(createAddressDTO.userId);
    } catch (error) {
      /**
       * Instead of this try saving the error and user/client application shouldn't know about this error.
       */
      throw new RequestTimeoutException(
        'Unable to process request at this moment.',
        {
          description: 'Database Error',
        },
      );
    }

    if (existingUser) {
      const newAddress = this.addressRepository.create({
        ...createAddressDTO,
        user: existingUser,
      });
      return await this.addressRepository.save<Address>(newAddress);
    } else {
      throw new BadRequestException('User not found.');
    }
  }
}

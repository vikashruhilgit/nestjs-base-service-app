import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateUserProvider {
  constructor(
    /**
     * Inject User Repository
     */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    /**
     * Inject Hashing provider service
     */
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async create(createUserDTO: CreateUserDTO): Promise<User> {
    let existingRecord;
    try {
      existingRecord = await this.userRepository.findOne({
        where: {
          email: createUserDTO.email,
        },
      });
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

    if (existingRecord) {
      throw new BadRequestException('record existing try with different name.');
    } else {
      let newUser = this.userRepository.create({
        ...createUserDTO,
        password: await this.hashingProvider.hashPassword(
          createUserDTO.password,
        ),
      });
      newUser = await this.userRepository.save<User>(newUser);
      return newUser;
    }
  }
}

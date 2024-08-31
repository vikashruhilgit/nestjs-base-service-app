/*
 * Type of dependency injection -
 *  inter-modular injection
 *  inner-module dependency
 *  circular dependency
 *
 *  Exception handler:
 *  https://docs.nestjs.com/exception-filters#built-in-http-exceptions
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { FilterUserDTO } from '../dto/filter-user.dto';
import { Like, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { UserStatus } from '../user.model';
import { CreateManyProvider } from './create-many.provider';
import { CreateUserProvider } from './create-user.provider';
import { FindUserByEmailProvider } from './find-user-by-email.provider';
// import { ConfigType } from '@nestjs/config';
// import { exampleConfiguration } from '../config/example.config';
/**
 * configuration service to fetch environment variable.
 */
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    /**
     * Injecting example repository of type Example entity
     */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    /**
     * Injection Pagination provider
     */
    private readonly paginationProvider: PaginationProvider,

    /**
     * Inject create many provider
     */
    private readonly createManyProvider: CreateManyProvider,

    /**
     * Inject create user provider
     */
    private readonly createUserProvider: CreateUserProvider,

    /**
     *
     */
    private readonly findUserByEmailProvider: FindUserByEmailProvider,
    /**
     * Injecting configuration with type
     * Module specific config with types
     */
    // @Inject(exampleConfiguration.KEY)
    // private readonly exampleConfig: ConfigType<typeof exampleConfiguration>,
    /**
     * Injecting configuration service
     */
    // private readonly configService: ConfigService,
  ) {
    // console.log(this.configService.get('APP_TEST_VARIABLE'));
    // console.log(this.configService.get('appConfig.environment'));
    // console.log(this.exampleConfig.example_var);
  }

  async findAll(filters: FilterUserDTO) {
    const { search, status, limit, page } = filters;

    const examples = await this.paginationProvider.paginateQuery(
      this.userRepository,
      { limit, page },
      {
        where: {
          status: status,
          firstName: search ? Like(`%${search}%`) : undefined,
          lastName: search ? Like(`%${search}%`) : undefined,
        },
      },
    );

    return examples;
  }

  async findByID(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`Example with Id: ${id} is not found`);
    }
    return user;
  }

  async deleteByID(id: string) {
    await this.userRepository.delete(id);
    return {
      delete: true,
      id,
    };
  }

  async softDeleteByID(id: string) {
    await this.userRepository.softDelete(id);
    return {
      delete: true,
      id,
    };
  }

  public async create(createUserDTO: CreateUserDTO): Promise<User> {
    return this.createUserProvider.create(createUserDTO);
  }

  async updateStatus(id: string, status: UserStatus): Promise<User> {
    let example = await this.findByID(id);
    example.status = status;
    example = await this.userRepository.save(example);
    return example;
  }

  async findUserByEmail(email: string) {
    return await this.findUserByEmailProvider.findUserByEmail(email);
  }

  /* async update(
    id: string,
    updateExampleDTO: CreateExampleDTO,
  ): Promise<Example> {
    let example = await this.findByID(id);
    example = {
      id: example.id,
      ...updateExampleDTO,
    };
    example = await this.exampleRepository.save(example);
    return example;
  } */

  async patch(
    id: string,
    updateExampleDTO: Partial<CreateUserDTO>,
  ): Promise<User> {
    let example = await this.findByID(id);
    example = {
      ...example,
      ...updateExampleDTO,
    };
    example = await this.userRepository.save(example);
    return example;
  }

  /**
   * basic example of transaction
   */
  async createMany(users: CreateUserDTO[]) {
    return await this.createManyProvider.createMany(users);
  }
}

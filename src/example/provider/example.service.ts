/*
 * Type of dependency injection -
 *  inter-modular injection
 *  inner-module dependency
 *  circular dependency
 *
 *  Exception handler:
 *  https://docs.nestjs.com/exception-filters#built-in-http-exceptions
 */

import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateExampleDTO } from '../dto/create-example.dto';
import { FilterExampleDTO } from '../dto/filter-example.dto';
import { StatusDTO } from '../dto/example-status.dto';
import { PatchExampleDTO } from '../dto/patch-example.dto';
import { AuthService } from '../../auth/auth.service';
import { DataSource, Like, Repository } from 'typeorm';
import { Example } from '../example.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
// import { ConfigType } from '@nestjs/config';
// import { exampleConfiguration } from '../config/example.config';
/**
 * configuration service to fetch environment variable.
 */
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExampleService {
  private examples: Example[] = [];

  constructor(
    /**
     * Injecting auth service with circular dependency
     */
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    /**
     * Injecting example repository of type Example entity
     */
    @InjectRepository(Example)
    private readonly exampleRepository: Repository<Example>,

    /**
     * injecting dataSource
     */
    private readonly dataSource: DataSource,

    /**
     * Injection Pagination provider
     */
    private readonly paginationProvider: PaginationProvider,

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

  async findAll(): Promise<Example[]> {
    if (this.authService.isAuthenticated()) {
      return await this.exampleRepository.find();
    }
    throw new UnauthorizedException('User in not authenticated');
  }

  async findAllWithFilters(filters: FilterExampleDTO) {
    console.log(filters);

    const { search, status, limit, page } = filters;

    const examples = await this.paginationProvider.paginateQuery(
      this.exampleRepository,
      { limit, page },
      {
        where: {
          status: status,
          title: search ? Like(`%${search}%`) : undefined,
          description: search ? Like(`%${search}%`) : undefined,
        },
      },
    );

    return examples;
  }

  async findByID(id: string): Promise<Example> {
    const example = await this.exampleRepository.findOne({
      where: {
        id,
      },
    });
    if (!example) {
      throw new NotFoundException(`Example with Id: ${id} is not found`);
    }
    return example;
  }

  deleteByID(id: string): void {
    const examples = this.examples.filter((example) => example.id !== id);
    if (this.examples.length === examples.length) {
      throw new NotFoundException('Example with Id: ${id} is not found');
    }
    this.examples = examples;
  }

  public async create(createExampleDTO: CreateExampleDTO): Promise<Example> {
    let existingRecord;
    try {
      existingRecord = await this.exampleRepository.findOne({
        where: {
          title: createExampleDTO.title,
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
      let newExample = this.exampleRepository.create(createExampleDTO);
      newExample = await this.exampleRepository.save<Example>(newExample);
      return newExample;
    }
  }

  async updateStatus(id: string, statusDTO: StatusDTO): Promise<Example> {
    const { status } = statusDTO;
    let example = await this.findByID(id);
    example.status = status;
    example = await this.exampleRepository.save(example);
    return example;
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

  async patch(id: string, updateExampleDTO: PatchExampleDTO): Promise<Example> {
    let example = await this.findByID(id);
    example = {
      ...example,
      ...updateExampleDTO,
    };
    example = await this.exampleRepository.save(example);
    return example;
  }

  /**
   * basic example of transaction
   */
  async exampleTransaction(examples: CreateExampleDTO[]) {
    // create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    // connect to date source
    await queryRunner.connect();
    // Start transaction
    await queryRunner.startTransaction();

    try {
      //run your DB query
      // to execute db query use queryRunner.manager
      queryRunner.manager.create(Example, examples[0]);
      await queryRunner.manager.save(Example, examples[0]);
      queryRunner.manager.create(Example, examples[1]);
      await queryRunner.manager.save(Example, examples[1]);
      // commit transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      //roll back if there is any error
      await queryRunner.rollbackTransaction();
    } finally {
      // release connection
      await queryRunner.release();
    }
  }
}

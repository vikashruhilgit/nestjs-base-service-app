/*
 * Type of dependency injection -
 *  inter-modular injection
 *  inner-module dependency
 *  circular dependency
 */

import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExampleDTO } from '../dto/create-example.dto';
import { FilterExampleDTO } from '../dto/filter-example.dto';
import { StatusDTO } from '../dto/example-status.dto';
import { PatchExampleDTO } from '../dto/patch-example.dto';
import { AuthService } from 'src/auth/auth.service';
import { Like, Repository } from 'typeorm';
import { Example } from '../example.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExampleService {
  private examples: Example[] = [];

  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(Example)
    private readonly exampleRepository: Repository<Example>,
  ) {}

  async findAll(): Promise<Example[]> {
    if (this.authService.isAuthenticated()) {
      return await this.exampleRepository.find();
    }
    throw new Error('User in not authenticated');
  }

  async findAllWithFilters(filters: FilterExampleDTO) {
    const { search, status } = filters;

    let examples = await this.exampleRepository.find({
      where: {
        status: status,
        title: search ? Like(`%${search}%`) : undefined,
        description: search ? Like(`%${search}%`) : undefined,
      },
    });

    if (status) {
      examples = examples.filter((Example) => Example.status === status);
    }

    if (search)
      examples = examples.filter(
        (example) =>
          example.title.includes(search) ||
          example.description.includes(search),
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
    let newExample = this.exampleRepository.create(createExampleDTO);
    newExample = await this.exampleRepository.save<Example>(newExample);
    return newExample;
  }

  async updateStatus(id: string, statusDTO: StatusDTO): Promise<Example> {
    const { status } = statusDTO;
    let example = await this.findByID(id);
    example.status = status;
    example = await this.exampleRepository.save(example);
    return example;
  }

  async update(
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
  }

  async patch(id: string, updateExampleDTO: PatchExampleDTO): Promise<Example> {
    let example = await this.findByID(id);
    example = {
      ...example,
      ...updateExampleDTO,
    };
    example = await this.exampleRepository.save(example);
    return example;
  }
}

/*
 * Type of dependency injection -
 * inter-modular injection
 * inner-module dependency
 * circular dependency
 */

import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Example, ExampleStatus } from '../example.model';
import { randomUUID } from 'crypto';
import { CreateExampleDTO } from '../dto/create-example.dto';
import { FilterExampleDTO } from '../dto/filter-example.dto';
import { StatusDTO } from '../dto/example-status.dto';
import { PatchExampleDTO } from '../dto/patch-example.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ExampleService {
  private examples: Example[] = [];

  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  findAll(): Example[] {
    console.log('helllo');

    if (this.authService.isAuthenticated()) {
      return this.examples;
    }
    throw new Error('User in not authenticated');
  }

  findAllWithFilters(filters: FilterExampleDTO) {
    const { search, status } = filters;
    let examples = this.findAll();

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

  findByID(id: string): Example {
    const example = this.examples.find((Example) => Example.id === id);
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

  create(createExampleDTO: CreateExampleDTO): Example {
    const { title, description } = createExampleDTO;
    const example = {
      id: randomUUID(),
      title,
      description,
      status: ExampleStatus.OPEN,
    };
    this.examples.push(example);
    return example;
  }

  updateStatus(id: string, statusDTO: StatusDTO): Example {
    const { status } = statusDTO;
    const example = this.findByID(id);
    example.status = status;
    return example;
  }

  update(id: string, updateExampleDTO: CreateExampleDTO): Example {
    const example = this.findByID(id);
    const updateExample = {
      id: example.id,
      ...updateExampleDTO,
    };
    this.deleteByID(id);
    this.examples.push(updateExample);
    return updateExample;
  }

  patch(id: string, updateExampleDTO: PatchExampleDTO): Example {
    const example = this.findByID(id);
    const updateExample = {
      ...example,
      ...updateExampleDTO,
    };
    this.deleteByID(id);
    this.examples.push(updateExample);
    return updateExample;
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  // Put,
  Query,
} from '@nestjs/common';
import { ExampleService } from './provider/example.service';
import { Example } from './example.entity';
import { CreateExampleDTO } from './dto/create-example.dto';
import { FilterExampleDTO } from './dto/filter-example.dto';
import { StatusDTO } from './dto/example-status.dto';
import { ExampleIdDTO } from './dto/example-id.dto';
import { PatchExampleDTO } from './dto/patch-example.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('task')
@ApiTags('Example')
export class ExampleController {
  constructor(private exampleService: ExampleService) {}

  /* 
    Transformation pipe example
    ALL Parse type pipe assume param is required, don't set optional is using parse type pipe
    getTaskByID(@Param('id', ParseIntPipe) id: number): Task {

    DefaultValuePipe eg:
    getTaskByID(@Query('limit' new DefaultValuePipe(10), ParseIntPipe) id: number): Task {
  */

  @ApiOperation({
    summary: 'Example service to fetch all records',
  })
  @ApiResponse({
    status: 200,
  })
  @Get()
  findAll(@Query() filters: FilterExampleDTO): Promise<Example[]> {
    if (Object.keys(filters).length > 0) {
      return this.exampleService.findAllWithFilters(filters);
    }
    return this.exampleService.findAll();
  }

  @Get('/:id')
  getByID(@Param() exampleIdDTO: ExampleIdDTO): Promise<Example> {
    return this.exampleService.findByID(exampleIdDTO.id);
  }

  @Delete('/:id')
  deleteByID(@Param() exampleIdDTO: ExampleIdDTO): void {
    return this.exampleService.deleteByID(exampleIdDTO.id);
  }

  @Post()
  create(@Body() createTaskDTO: CreateExampleDTO): Promise<Example> {
    return this.exampleService.create(createTaskDTO);
  }

  @Patch('/:id')
  updateStatus(
    @Param() exampleIdDTO: ExampleIdDTO,
    @Param('status') statusDTO: StatusDTO,
  ): Promise<Example> {
    return this.exampleService.updateStatus(exampleIdDTO.id, statusDTO);
  }

  @Patch('/:id')
  patch(
    @Param() exampleIdDTO: ExampleIdDTO,
    @Body() patchExampleDTO: PatchExampleDTO,
  ): Promise<Example> {
    return this.exampleService.patch(exampleIdDTO.id, patchExampleDTO);
  }

  /* @Put('/:id')
  update(
    @Param() exampleIdDTO: ExampleIdDTO,
    @Body() updateTaskDTO: CreateExampleDTO,
  ): Example {
    return this.exampleService.update(exampleIdDTO.id, updateTaskDTO);
  } */
}

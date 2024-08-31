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
import { UserService } from './providers/user.service';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { FilterUserDTO } from './dto/filter-user.dto';
import { UserIdDTO } from './dto/user-id.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Paginated } from 'src/common/pagination/interface/paginated.interface';
import { UserStatus } from './user.model';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enum/auth-type.enum';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  /* 
    Transformation pipe example
    ALL Parse type pipe assume param is required, don't set optional is using parse type pipe
    getTaskByID(@Param('id', ParseIntPipe) id: number): Task {

    DefaultValuePipe eg:
    getTaskByID(@Query('limit' new DefaultValuePipe(10), ParseIntPipe) id: number): Task {
  */

  @ApiOperation({
    summary: 'Example service to fetch all Users',
  })
  @ApiResponse({
    status: 200,
  })
  @Get()
  findAll(@Query() filters: FilterUserDTO): Promise<Paginated<User>> {
    return this.userService.findAll(filters);
  }

  @Get('/:id')
  getByID(@Param() userIdDTO: UserIdDTO): Promise<User> {
    return this.userService.findByID(userIdDTO.id);
  }

  @Delete('/:id')
  deleteByID(@Param() userIdDTO: UserIdDTO) {
    return this.userService.deleteByID(userIdDTO.id);
  }

  @Delete('/:id/soft-delete')
  softDeleteByID(@Param() userIdDTO: UserIdDTO) {
    return this.userService.softDeleteByID(userIdDTO.id);
  }

  @Post()
  @Auth(AuthType.None)
  create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.userService.create(createUserDTO);
  }

  @Post('many')
  createMany(@Body() createUsersDTO: CreateUserDTO[]): Promise<User[]> {
    return this.userService.createMany(createUsersDTO);
  }

  @Patch('/:id')
  updateStatus(
    @Param() userIdDTO: UserIdDTO,
    @Param('status') status: UserStatus,
  ): Promise<User> {
    return this.userService.updateStatus(userIdDTO.id, status);
  }

  @Patch('/:id')
  patch(
    @Param() userIdDTO: UserIdDTO,
    @Body() patchUserDTO: Partial<CreateUserDTO>,
  ): Promise<User> {
    return this.userService.patch(userIdDTO.id, patchUserDTO);
  }

  /* @Put('/:id')
  update(
    @Param() exampleIdDTO: ExampleIdDTO,
    @Body() updateTaskDTO: CreateExampleDTO,
  ): Example {
    return this.userService.update(exampleIdDTO.id, updateTaskDTO);
  } */
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getAllTasks(@Query() filters: FilterTaskDTO): Task[] {
    if (Object.keys(filters).length > 0) {
      return this.taskService.getTaskWithFilters(filters);
    }
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTaskByID(@Param('id') id: string): Task {
    return this.taskService.getTaskByID(id);
  }

  @Delete('/:id')
  deleteTaskByID(@Param('id') id: string): void {
    return this.taskService.deleteTaskByID(id);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.taskService.createTask(createTaskDTO);
  }

  @Patch('/:id')
  updateTaskStatus(
    @Param('id') id: string,
    @Param('status') status: TaskStatus,
  ): Task {
    return this.taskService.updateTaskStatus(id, status);
  }

  @Put('/:id')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDTO: CreateTaskDTO,
  ): Task {
    return this.taskService.updateTask(id, updateTaskDTO);
  }
}

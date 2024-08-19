import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { randomUUID } from 'crypto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskWithFilters(filters: FilterTaskDTO) {
    const { search, status } = filters;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search)
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );

    return tasks;
  }

  getTaskByID(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with Id: ${id} is not found`);
    }
    return task;
  }

  deleteTaskByID(id: string): void {
    const tasks = this.tasks.filter((task) => task.id !== id);
    if (this.tasks.length === tasks.length) {
      throw new NotFoundException('Task with Id: ${id} is not found');
    }
    this.tasks = tasks;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task = {
      id: randomUUID(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, updateTaskStatusDTO: UpdateTaskStatusDTO): Task {
    const { status } = updateTaskStatusDTO;
    const task = this.getTaskByID(id);
    task.status = status;
    return task;
  }

  updateTask(id: string, updateTaskDTO: CreateTaskDTO): Task {
    const task = this.getTaskByID(id);
    const updateTask = {
      ...task,
      ...updateTaskDTO,
    };
    this.deleteTaskByID(id);
    this.tasks.push(updateTask);
    return updateTask;
  }
}

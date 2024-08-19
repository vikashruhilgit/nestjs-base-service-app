import { TaskStatus } from '../task.model';

export class FilterTaskDTO {
  status?: TaskStatus;
  search?: string;
}

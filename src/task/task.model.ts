export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'ON_PROGRESS',
  CLOSE = 'CLOSE',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

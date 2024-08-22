export enum ExampleStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'ON_PROGRESS',
  CLOSE = 'CLOSE',
}

export interface Example {
  id: string;
  title: string;
  description: string;
  status: ExampleStatus;
}

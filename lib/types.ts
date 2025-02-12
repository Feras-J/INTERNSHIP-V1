export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE"
}

export type Task = {
  id: string
  title: string
  description: string
  email: string
  status: TaskStatus
  createdAt: Date
}


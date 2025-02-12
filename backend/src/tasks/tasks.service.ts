import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import { Task } from "./task.schema"

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec()
  }

  async create(task: Task): Promise<Task> {
    const newTask = new this.taskModel(task)
    return newTask.save()
  }

  async update(id: string, task: Task): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, task, { new: true }).exec()
    if (!updatedTask) throw new Error("Task not found")
    return updatedTask
  }

  async delete(id: string): Promise<Task> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec()
    if (!deletedTask) throw new Error("Task not found")
    return deletedTask
  }
}


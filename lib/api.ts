import type { Task } from "./types"

export const api = {
  getTasks: async (): Promise<Task[]> => {
    const response = await fetch("/api/tasks")
    return response.json()
  },

  createTask: async (task: Omit<Task, "_id" | "createdAt">): Promise<Task> => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    })
    return response.json()
  },

  updateTask: async (task: Task): Promise<Task> => {
    const response = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    })
    return response.json()
  },

  deleteTask: async (id: string): Promise<void> => {
    await fetch(`/api/tasks?id=${id}`, { method: "DELETE" })
  },
}


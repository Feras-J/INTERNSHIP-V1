import type { Task } from './types'

const BASE_URL = '/api'

export const api = {
  async getTasks(): Promise<Task[]> {
    const res = await fetch(`${BASE_URL}/tasks`)
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || 'Failed to fetch tasks')
    }
    return res.json()
  },

  async createTask(task: Omit<Task, '_id'>): Promise<Task> {
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || 'Failed to create task')
    }
    return res.json()
  },

  async updateTask(task: Task): Promise<Task> {
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || 'Failed to update task')
    }
    return res.json()
  },

  async deleteTask(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/tasks?id=${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || 'Failed to delete task')
    }
  }
}
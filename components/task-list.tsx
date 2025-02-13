// filepath: /c:/Users/Hp/Downloads/INTERNSHIP/my-app/components/task-list.tsx
"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TaskTable } from "@/components/task-table"
import { AddTaskDialog } from "@/components/add-task-dialog"
import type { Task, TaskStatus } from "@/lib/types"
import { api } from "@/lib/api"
import { v4 as uuidv4 } from "uuid"

// Change CreateTaskInput to omit "createdAt" and "_id" so that id is still present.
interface CreateTaskInput extends Omit<Task, "id" | "createdAt" | "_id"> {
  status: TaskStatus;
}

interface TaskListProps {
  initialTasks?: Task[]
}

export function TaskList({ initialTasks = [] }: TaskListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [tasks, setTasks] = useState(initialTasks)

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await api.getTasks()
        console.log('Fetched tasks in component:', fetchedTasks)
        setTasks(fetchedTasks)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }
    
    loadTasks()
  }, [])

  const addTask = async (task: CreateTaskInput) => {
    // Generate a unique id and createdAt for the new task.
    const taskWithId = { ...task, id: uuidv4(), createdAt: new Date() }
    await api.createTask(taskWithId)
    const fetchedTasks = await api.getTasks()
    setTasks(fetchedTasks)
    setIsDialogOpen(false)
  }

  const deleteTask = async (id: string) => {
    await api.deleteTask(id)
    const fetchedTasks = await api.getTasks()
    setTasks(fetchedTasks)
  }

  const updateTask = async (task: Task) => {
    await api.updateTask(task)
    const fetchedTasks = await api.getTasks()
    setTasks(fetchedTasks)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Tasks ({tasks.length})</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>
      {tasks.length === 0 ? (
        <p>No tasks found. Create one to get started!</p>
      ) : (
        <TaskTable tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} />
      )}
      <AddTaskDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onAdd={addTask} />
    </div>
  )
}
'use client';

import { TaskList } from "@/components/task-list"
import { SearchBar } from "@/components/search-bar"

interface Task {
  id: string
  title: string
  completed: boolean
  description: string
  email: string
  status: string
}

export default async function Home() {
  let tasks: Task[] = []
  
  try {
    // Fetch from your API route instead of direct DB connection
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch tasks')
    }
    
    tasks = await response.json()
  } catch (err) {
    console.error("Failed to fetch tasks:", err)
    tasks = []
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <SearchBar tasks={tasks} />
        <TaskList /> {/* Added tasks prop */}
      </div>
    </main>
  )
}
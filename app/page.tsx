import { TaskList } from "@/components/task-list"
import { SearchBar } from "@/components/search-bar"
import type { Task } from "@/lib/types"

// This can be async since it's a server component
export default async function Home() {
  let tasks: Task[] = []
  
  try {
    // For Vercel deployment
    const protocol = process.env.VERCEL_URL ? 'https' : 'http'
    const baseUrl = process.env.VERCEL_URL 
      ? `${protocol}://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

    console.log('Fetching tasks from:', `${baseUrl}/api/tasks`) // Debug URL

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch(`${baseUrl}/api/tasks`, {
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    clearTimeout(timeoutId)

    if (!response.ok) {
      console.error('Failed to fetch tasks:', response.status, response.statusText)
      throw new Error(`Failed to fetch tasks: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    
    if (!Array.isArray(data)) {
      console.error('Invalid response format:', data)
      throw new Error('Invalid response format')
    }
    
    tasks = data
    console.log('Successfully fetched tasks:', tasks.length) // Debug task count
  } catch (err) {
    console.error("Failed to fetch tasks:", err)
    tasks = []
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <SearchBar initialTasks={tasks} />
        <TaskList initialTasks={tasks} />
      </div>
    </main>
  )
}
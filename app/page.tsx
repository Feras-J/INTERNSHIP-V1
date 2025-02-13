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
      : process.env.NEXT_PUBLIC_API_URL

    const response = await fetch(`${baseUrl}/api/tasks`, {
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
        <TaskList />
      </div>
    </main>
  )
}
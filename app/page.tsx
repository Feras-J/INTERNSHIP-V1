import { TaskList } from "@/components/task-list"
import { SearchBar } from "@/components/search-bar"

export default async function Home() {
  let tasks = []
  try {
    // Fetch tasks from your Next.js API (this may fail during export)
    const res = await fetch("http://localhost:3001/api/tasks", { cache: "no-store" })
    tasks = await res.json()
  } catch (error) {
    // Fallback to static tasks if API fetch fails
    tasks = [] // ...or add static sample tasks
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


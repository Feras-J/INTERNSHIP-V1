import { TaskList } from "@/components/task-list"
import { SearchBar } from "@/components/search-bar"

export default async function Home() {
  // Fetch tasks from your Next.js API
  const res = await fetch("http://localhost:3001/api/tasks", { cache: "no-store" })
  const tasks = await res.json()

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <SearchBar tasks={tasks} />
        <TaskList />
      </div>
    </main>
  )
}


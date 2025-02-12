import { TaskList } from "@/components/task-list"
import { SearchBar } from "@/components/search-bar"
import { MongoClient } from 'mongodb'

interface Task {
  _id: string
  title: string
  completed: boolean
  description: string
  email: string
  status: string
}

// For Next.js 14 App Router, use a async Server Component
export default async function Home() {
  let tasks: Task[] = []
  
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI as string)
    const db = client.db('cluster0.toh0y.mongodb.net')
    const documents = await db.collection('tasks').find({}).toArray()
    tasks = documents.map(doc => ({
      _id: doc._id.toString(),
      title: doc.title as string,
      completed: doc.completed as boolean,
      description: doc.description as string,
      email: doc.email as string,
      status: doc.status as string
    }))
    await client.close()
  } catch (err) {
    console.error("Failed to fetch tasks:", err)
    tasks = []
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <SearchBar tasks={tasks} />
        <TaskList  />
      </div>
    </main>
  )
}

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

export default async function Home() {
  let tasks: Task[] = []
  
  try {
    // Use the correct database name, not the connection URL
    const client = await MongoClient.connect(process.env.MONGODB_URI as string)
    const db = client.db('mongodb+srv://feras:FJ123@cluster0.toh0y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0') // Replace with your actual database name
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
        <TaskList /> {/* Pass tasks as a prop */}
      </div>
    </main>
  )
}
import { TaskList } from "@/components/task-list"
import { SearchBar } from "@/components/search-bar"
import { MongoClient } from 'mongodb'

// Define the Task interface
interface Task {
  _id: string
  title: string
  completed: boolean
  description: string
  email: string
  status: string
}

// Add static generation
export async function generateStaticProps() {
  let tasks: Task[] = []
  try {
    // Connect to MongoDB during build time
    const client = await MongoClient.connect(process.env.MONGODB_URI as string)
    const db = client.db('your_database_name')
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
    console.error("Failed to fetch tasks during build:", err)
    tasks = []
  }
  return { props: { tasks } }
}

export default function Home({ tasks }: { tasks: Task[] }) {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <SearchBar tasks={tasks} />
        <TaskList />
      </div>
    </main>
  )
}
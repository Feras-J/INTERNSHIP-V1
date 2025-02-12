import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { MongoClient } from 'mongodb'

export async function GET() {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI as string)
    const db = client.db('taskdb') // Changed to match your database name
    const tasks = await db.collection('tasks').find({}).toArray()
    await client.close()
    
    return NextResponse.json(tasks)
  } catch (err) {
    console.error('Failed to fetch tasks:', err)
    return NextResponse.json(
      { message: 'Failed to fetch tasks' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("taskdb")
    const task = await request.json()
    const result = await db.collection("tasks").insertOne(task)
    return NextResponse.json({ ...task, _id: result.insertedId })
  } catch (err) {
    console.error('Failed to create task:', err)
    return NextResponse.json(
      { message: 'Failed to create task' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("taskdb")
    const updatedTask = await request.json()
    const { _id, ...taskWithoutId } = updatedTask
    
    const result = await db.collection("tasks").updateOne(
      { _id: new ObjectId(_id) },
      { $set: taskWithoutId }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Task not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedTask)
  } catch (err) {
    console.error('Failed to update task:', err)
    return NextResponse.json(
      { message: 'Failed to update task' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("taskdb")
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    if (!id) {
      return NextResponse.json(
        { message: 'Missing id parameter' },
        { status: 400 }
      )
    }

    const result = await db.collection("tasks").deleteOne({ 
      _id: new ObjectId(id) 
    })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Task not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "Task deleted" })
  } catch (err) {
    console.error('Failed to delete task:', err)
    return NextResponse.json(
      { message: 'Failed to delete task' },
      { status: 500 }
    )
  }
}
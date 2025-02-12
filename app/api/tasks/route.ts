import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  const client = await clientPromise
  const db = client.db("taskdb")
  const tasks = await db.collection("tasks").find({}).toArray()
  return NextResponse.json(tasks)
}

export async function POST(request: NextRequest) {
  const client = await clientPromise
  const db = client.db("taskdb")
  const task = await request.json()
  const result = await db.collection("tasks").insertOne(task)
  return NextResponse.json({ ...task, _id: result.insertedId })
}

export async function PUT(request: NextRequest) {
  const client = await clientPromise
  const db = client.db("taskdb")
  const updatedTask = await request.json()
  const { _id, ...taskWithoutId } = updatedTask
  await db.collection("tasks").updateOne({ _id: new ObjectId(_id) }, { $set: taskWithoutId })
  return NextResponse.json(updatedTask)
}

export async function DELETE(request: NextRequest) {
  const client = await clientPromise
  const db = client.db("taskdb")
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) {
    throw new Error("Missing id");
  }
  await db.collection("tasks").deleteOne({ _id: new ObjectId(id) })
  return NextResponse.json({ message: "Task deleted" })
}


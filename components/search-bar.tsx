"use client"

import React, { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { CornerDownLeft } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Define Task type
interface Task {
  title: string
  description: string
  status: string
}

const Loader = () => <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white" />

const SubmitButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => {
  const [pending, setPending] = useState(false)

  useEffect(() => {
    // Simulate form status change
    const timer = setTimeout(() => setPending(false), 2000)
    setPending(true)
    return () => clearTimeout(timer)
  }, [])

  return (
    <button
      ref={ref}
      type="submit"
      disabled={pending}
      className="text-white rounded-lg hover:bg-white/25 focus:bg-white/25 w-8 h-8 aspect-square flex items-center justify-center ring-0 outline-0"
      {...props}
    >
      {pending ? <Loader /> : <CornerDownLeft size={16} className="-ml-px" />}
    </button>
  )
})
SubmitButton.displayName = "SubmitButton"

interface SearchBarProps {
  tasks?: Task[]
}

export const SearchBar: React.FC<SearchBarProps> = ({ tasks = [] }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Task[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    console.log("SearchBar mounted. tasks received:", tasks) // Debug log on mount
  }, [tasks])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setHasSearched(true)

    const query = searchQuery.trim().toLowerCase()
    console.log("Search query:", query)
    console.log("Tasks array:", tasks)

    if (!query) {
      setSearchResults([])
      return
    }

    const results = tasks
      .filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      )
      .sort((a, b) => {
        const aStarts = a.title.toLowerCase().startsWith(query) ? 0 : 1
        const bStarts = b.title.toLowerCase().startsWith(query) ? 0 : 1
        return aStarts - bStarts
      })

    console.log("Filtered results:", results)
    setSearchResults(results)
  }

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <form onSubmit={handleSearch} className="bg-black rounded-xl shadow-lg h-fit flex flex-row px-4 items-center w-full mx-auto mb-8">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className="bg-transparent text-white placeholder:text-gray-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 flex-grow transition-all duration-300 border-0"
        />
        <SubmitButton />
      </form>
      
      {searchResults.length > 0 ? (
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchResults.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        hasSearched && (
          <div className="mt-4 text-black">
            No results found.
          </div>
        )
      )}
    </div>
  )
}
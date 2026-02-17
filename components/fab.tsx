"use client"

import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "./ui/button"

export function FAB() {
  return (
    <Link href="/events/create">
      <Button
        size="icon"
        className="fixed bottom-20 right-4 z-40 h-14 w-14 rounded-full shadow-lg"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </Link>
  )
}

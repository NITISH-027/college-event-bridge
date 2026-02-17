"use client"

import { useState } from "react"
import { deleteEvent } from "@/app/actions/events"
import { Button } from "./ui/button"
import { Trash2 } from "lucide-react"

export function DeleteEventButton({ eventId }: { eventId: string }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return
    }

    setLoading(true)
    try {
      const result = await deleteEvent(eventId)
      if (result?.error) {
        alert(result.error)
        setLoading(false)
      }
    } catch (err) {
      alert('Failed to delete event')
      setLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={loading}
    >
      <Trash2 className="h-5 w-5 text-destructive" />
    </Button>
  )
}

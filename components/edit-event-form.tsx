"use client"

import { useState } from "react"
import { updateEvent } from "@/app/actions/events"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { LayoutContainer } from "./layout-container"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface EditEventFormProps {
  event: {
    id: string
    title: string
    description: string
    college: string
    event_date: string
    image_url: string | null
  }
}

export function EditEventForm({ event }: EditEventFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(event.image_url)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.append('existing_image_url', event.image_url || '')
    
    try {
      const result = await updateEvent(event.id, formData)
      if (result?.error) {
        setError(result.error)
        setLoading(false)
      }
    } catch (err) {
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  // Format date for datetime-local input
  const formattedDate = new Date(event.event_date).toISOString().slice(0, 16)

  return (
    <div className="pb-20">
      <header className="sticky top-0 z-40 bg-background border-b">
        <LayoutContainer>
          <div className="flex items-center gap-3 h-14">
            <Link href={`/events/${event.id}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Edit Event</h1>
          </div>
        </LayoutContainer>
      </header>

      <LayoutContainer className="py-4">
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title *
                </label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  defaultValue={event.title}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="college" className="text-sm font-medium">
                  College *
                </label>
                <Input
                  id="college"
                  name="college"
                  type="text"
                  defaultValue={event.college}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="event_date" className="text-sm font-medium">
                  Event Date & Time *
                </label>
                <Input
                  id="event_date"
                  name="event_date"
                  type="datetime-local"
                  defaultValue={formattedDate}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description *
                </label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={event.description}
                  required
                  disabled={loading}
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium">
                  Event Image
                </label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={loading}
                />
                {imagePreview && (
                  <div className="relative h-48 w-full mt-2 rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Updating...' : 'Update Event'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </LayoutContainer>
    </div>
  )
}

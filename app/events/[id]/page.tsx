import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { LayoutContainer } from "@/components/layout-container"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Edit, Trash2 } from "lucide-react"
import { DeleteEventButton } from "@/components/delete-event-button"
import { CommentsSection } from "@/components/comments-section"

export default async function EventDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: event } = await supabase
    .from('events')
    .select('*, profiles!events_creator_id_fkey(full_name, email)')
    .eq('id', params.id)
    .single()

  if (!event) {
    notFound()
  }

  const isOwner = user?.id === event.creator_id

  const formattedDate = new Date(event.event_date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="pb-20">
      <header className="sticky top-0 z-40 bg-background border-b">
        <LayoutContainer>
          <div className="flex items-center justify-between h-14">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            {isOwner && (
              <div className="flex gap-2">
                <Link href={`/events/${event.id}/edit`}>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-5 w-5" />
                  </Button>
                </Link>
                <DeleteEventButton eventId={event.id} />
              </div>
            )}
          </div>
        </LayoutContainer>
      </header>

      <div>
        {event.image_url && (
          <div className="relative h-64 w-full">
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <LayoutContainer className="py-4">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <MapPin className="h-4 w-4" />
                {event.college}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              <p className="text-base whitespace-pre-wrap">{event.description}</p>
            </div>

            <div className="text-sm text-muted-foreground">
              Created by {event.profiles?.full_name || event.profiles?.email || 'Unknown'}
            </div>
          </div>
        </LayoutContainer>

        <div className="border-t mt-6">
          <CommentsSection eventId={event.id} userId={user?.id} />
        </div>
      </div>
    </div>
  )
}

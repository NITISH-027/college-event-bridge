import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { EditEventForm } from "@/components/edit-event-form"

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  if (!event) {
    notFound()
  }

  if (event.creator_id !== user.id) {
    redirect(`/events/${id}`)
  }

  return <EditEventForm event={event} />
}

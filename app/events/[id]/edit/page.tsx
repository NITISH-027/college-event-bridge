import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { EditEventForm } from "@/components/edit-event-form"

export default async function EditEventPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!event) {
    notFound()
  }

  if (event.creator_id !== user.id) {
    redirect(`/events/${params.id}`)
  }

  return <EditEventForm event={event} />
}

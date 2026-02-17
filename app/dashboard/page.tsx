import { createClient } from "@/lib/supabase/server"
import { EventCard } from "@/components/event-card"
import { LayoutContainer } from "@/components/layout-container"
import { Navbar } from "@/components/navbar"
import { FAB } from "@/components/fab"
import { Calendar } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true })

  return (
    <>
      <div className="pb-20">
        <header className="sticky top-0 z-40 bg-background border-b">
          <LayoutContainer>
            <div className="flex items-center justify-between h-14">
              <h1 className="text-xl font-bold">Events</h1>
            </div>
          </LayoutContainer>
        </header>

        <LayoutContainer className="py-4">
          {error && (
            <div className="text-center py-8">
              <p className="text-destructive">Failed to load events</p>
            </div>
          )}
          
          {!error && events && events.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-lg font-semibold mb-2">No events yet</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Be the first to create an event
              </p>
            </div>
          )}

          {!error && events && events.length > 0 && (
            <div className="space-y-4">
              {events.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          )}
        </LayoutContainer>
      </div>

      <FAB />
      <Navbar />
    </>
  )
}

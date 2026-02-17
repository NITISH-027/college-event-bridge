import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { LayoutContainer } from "@/components/layout-container"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MessageCircle, User, LogOut } from "lucide-react"
import { signOut } from "../actions/auth"
import { ProfileEditForm } from "@/components/profile-edit-form"
import Link from "next/link"
import { EventCard } from "@/components/event-card"

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: events, count: eventsCount } = await supabase
    .from('events')
    .select('*', { count: 'exact' })
    .eq('creator_id', user.id)
    .order('created_at', { ascending: false })

  const { count: commentsCount } = await supabase
    .from('comments')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const initials = profile?.full_name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || profile?.email?.[0].toUpperCase() || 'U'

  return (
    <>
      <div className="pb-20">
        <header className="sticky top-0 z-40 bg-background border-b">
          <LayoutContainer>
            <div className="flex items-center justify-between h-14">
              <h1 className="text-xl font-bold">Profile</h1>
              <form action={signOut}>
                <Button variant="ghost" size="sm" type="submit">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </form>
            </div>
          </LayoutContainer>
        </header>

        <LayoutContainer className="py-4 space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  {initials}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">
                    {profile?.full_name || 'No name set'}
                  </h2>
                  <p className="text-sm text-muted-foreground">{profile?.email}</p>
                  {profile?.college && (
                    <p className="text-sm text-muted-foreground">{profile.college}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-2xl font-bold">{eventsCount || 0}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Events</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-2xl font-bold">{commentsCount || 0}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Comments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <ProfileEditForm profile={profile} />

          <Card>
            <CardHeader>
              <CardTitle>My Events</CardTitle>
            </CardHeader>
            <CardContent>
              {events && events.length > 0 ? (
                <div className="space-y-3">
                  {events.map((event) => (
                    <EventCard key={event.id} {...event} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  You haven't created any events yet
                </p>
              )}
            </CardContent>
          </Card>
        </LayoutContainer>
      </div>

      <Navbar />
    </>
  )
}

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Calendar, MapPin } from "lucide-react"

interface EventCardProps {
  id: string
  title: string
  description: string
  college: string
  event_date: string
  image_url?: string | null
}

export function EventCard({ id, title, description, college, event_date, image_url }: EventCardProps) {
  const formattedDate = new Date(event_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <Link href={`/events/${id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        {image_url && (
          <div className="relative h-48 w-full">
            <Image
              src={image_url}
              alt={title}
              fill
              className="object-cover"
              sizes="430px"
            />
          </div>
        )}
        <CardHeader className="pb-3">
          <CardTitle className="text-xl line-clamp-2">{title}</CardTitle>
          <CardDescription className="flex items-center gap-1 text-xs">
            <MapPin className="h-3 w-3" />
            {college}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

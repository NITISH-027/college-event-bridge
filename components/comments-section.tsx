"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { createComment, deleteComment } from "@/app/actions/comments"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { LayoutContainer } from "./layout-container"
import { MessageCircle, Trash2 } from "lucide-react"

interface Comment {
  id: string
  content: string
  created_at: string
  user_id: string
  profiles: {
    full_name: string | null
    email: string
  }
}

export function CommentsSection({ eventId, userId }: { eventId: string; userId?: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    // Fetch initial comments
    const fetchComments = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('comments')
        .select('*, profiles!comments_user_id_fkey(full_name, email)')
        .eq('event_id', eventId)
        .order('created_at', { ascending: true })

      if (data) {
        setComments(data as any)
      }
      setLoading(false)
    }

    fetchComments()

    // Subscribe to new comments
    const channel = supabase
      .channel(`comments:${eventId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
          filter: `event_id=eq.${eventId}`,
        },
        async (payload) => {
          // Fetch the new comment with profile data
          const { data } = await supabase
            .from('comments')
            .select('*, profiles!comments_user_id_fkey(full_name, email)')
            .eq('id', payload.new.id)
            .single()

          if (data) {
            setComments((prev) => [...prev, data as any])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [eventId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setSubmitting(true)
    const result = await createComment(eventId, newComment)
    
    if (result?.error) {
      alert(result.error)
    } else {
      setNewComment("")
    }
    setSubmitting(false)
  }

  const handleDelete = async (commentId: string) => {
    if (!confirm('Delete this comment?')) return

    const result = await deleteComment(commentId, eventId)
    if (result?.error) {
      alert(result.error)
    } else {
      setComments((prev) => prev.filter((c) => c.id !== commentId))
    }
  }

  return (
    <LayoutContainer className="py-4">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Comments ({comments.length})
        </h2>

        {userId && (
          <form onSubmit={handleSubmit} className="space-y-2">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              disabled={submitting}
              rows={3}
            />
            <Button type="submit" disabled={submitting || !newComment.trim()}>
              {submitting ? 'Posting...' : 'Post Comment'}
            </Button>
          </form>
        )}

        {!userId && (
          <p className="text-sm text-muted-foreground">
            Sign in to post a comment
          </p>
        )}

        <div className="space-y-3">
          {loading && <p className="text-sm text-muted-foreground">Loading comments...</p>}
          
          {!loading && comments.length === 0 && (
            <p className="text-sm text-muted-foreground">No comments yet. Be the first to comment!</p>
          )}

          {!loading && comments.map((comment) => (
            <div key={comment.id} className="border-l-2 pl-3 space-y-1">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">
                      {comment.profiles?.full_name || comment.profiles?.email || 'Unknown'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm mt-1 whitespace-pre-wrap">{comment.content}</p>
                </div>
                {userId === comment.user_id && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDelete(comment.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutContainer>
  )
}

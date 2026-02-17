'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function createComment(eventId: string, content: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('comments')
    .insert({
      event_id: eventId,
      user_id: user.id,
      content,
    })

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/events/${eventId}`)
  return { success: true }
}

export async function deleteComment(commentId: string, eventId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Unauthorized' }
  }

  // Verify ownership
  const { data: comment } = await supabase
    .from('comments')
    .select('user_id')
    .eq('id', commentId)
    .single()

  if (!comment || comment.user_id !== user.id) {
    return { error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/events/${eventId}`)
  return { success: true }
}

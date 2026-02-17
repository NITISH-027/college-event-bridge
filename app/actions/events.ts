'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createEvent(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Unauthorized' }
  }

  // Handle image upload first
  let imageUrl = null
  const imageFile = formData.get('image') as File
  
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${user.id}-${Date.now()}.${fileExt}`
    
    const { error: uploadError, data } = await supabase.storage
      .from('event-images')
      .upload(fileName, imageFile)

    if (uploadError) {
      return { error: 'Failed to upload image' }
    }

    const { data: { publicUrl } } = supabase.storage
      .from('event-images')
      .getPublicUrl(fileName)
    
    imageUrl = publicUrl
  }

  const eventData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    college: formData.get('college') as string,
    event_date: formData.get('event_date') as string,
    image_url: imageUrl,
    creator_id: user.id,
  }

  const { error } = await supabase
    .from('events')
    .insert(eventData)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function updateEvent(eventId: string, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Unauthorized' }
  }

  // Verify ownership
  const { data: event } = await supabase
    .from('events')
    .select('creator_id')
    .eq('id', eventId)
    .single()

  if (!event || event.creator_id !== user.id) {
    return { error: 'Unauthorized' }
  }

  // Handle image upload
  let imageUrl = formData.get('existing_image_url') as string
  const imageFile = formData.get('image') as File
  
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${user.id}-${Date.now()}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('event-images')
      .upload(fileName, imageFile)

    if (uploadError) {
      return { error: 'Failed to upload image' }
    }

    const { data: { publicUrl } } = supabase.storage
      .from('event-images')
      .getPublicUrl(fileName)
    
    imageUrl = publicUrl
  }

  const updateData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    college: formData.get('college') as string,
    event_date: formData.get('event_date') as string,
    image_url: imageUrl,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase
    .from('events')
    .update(updateData)
    .eq('id', eventId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath(`/events/${eventId}`)
  redirect(`/events/${eventId}`)
}

export async function deleteEvent(eventId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Unauthorized' }
  }

  // Verify ownership
  const { data: event } = await supabase
    .from('events')
    .select('creator_id')
    .eq('id', eventId)
    .single()

  if (!event || event.creator_id !== user.id) {
    return { error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', eventId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

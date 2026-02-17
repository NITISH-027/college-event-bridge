"use client"

import { useState } from "react"
import { updateProfile } from "@/app/actions/profile"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface ProfileEditFormProps {
  profile: {
    full_name: string | null
    college: string | null
  } | null
}

export function ProfileEditForm({ profile }: ProfileEditFormProps) {
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await updateProfile(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setEditing(false)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!editing) {
    return (
      <Button onClick={() => setEditing(true)} variant="outline" className="w-full">
        Edit Profile
      </Button>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="full_name" className="text-sm font-medium">
              Full Name
            </label>
            <Input
              id="full_name"
              name="full_name"
              type="text"
              defaultValue={profile?.full_name || ''}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="college" className="text-sm font-medium">
              College
            </label>
            <Input
              id="college"
              name="college"
              type="text"
              defaultValue={profile?.college || ''}
              disabled={loading}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditing(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

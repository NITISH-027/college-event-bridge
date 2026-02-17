export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          college: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          college?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          college?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          college: string
          event_date: string
          image_url: string | null
          creator_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          college: string
          event_date: string
          image_url?: string | null
          creator_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          college?: string
          event_date?: string
          image_url?: string | null
          creator_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          event_id: string
          user_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          content?: string
          created_at?: string
        }
      }
    }
  }
}

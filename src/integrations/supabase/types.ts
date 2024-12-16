export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          location: string | null
          bio: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string | null
          location?: string | null
          bio?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          location?: string | null
          bio?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      personal_records: {
        Row: {
          id: string
          user_id: string
          distance: number
          time: unknown
          race_location: string
          date_achieved: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          distance: number
          time: unknown
          race_location: string
          date_achieved: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          distance?: number
          time?: unknown
          race_location?: string
          date_achieved?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
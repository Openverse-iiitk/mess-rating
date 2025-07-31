import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          image: string | null
          last_login: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          image?: string | null
          last_login?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          image?: string | null
          last_login?: string
          created_at?: string
        }
      }
      ratings: {
        Row: {
          id: string
          user_hash: string
          dish_name: string
          meal_type: 'breakfast' | 'lunch' | 'snacks' | 'dinner'
          rating: number
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_hash: string
          dish_name: string
          meal_type: 'breakfast' | 'lunch' | 'snacks' | 'dinner'
          rating: number
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_hash?: string
          dish_name?: string
          meal_type?: 'breakfast' | 'lunch' | 'snacks' | 'dinner'
          rating?: number
          date?: string
          created_at?: string
        }
      }
      menu_items: {
        Row: {
          id: string
          dish_name: string
          meal_type: 'breakfast' | 'lunch' | 'snacks' | 'dinner'
          date: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          dish_name: string
          meal_type: 'breakfast' | 'lunch' | 'snacks' | 'dinner'
          date: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          dish_name?: string
          meal_type?: 'breakfast' | 'lunch' | 'snacks' | 'dinner'
          date?: string
          is_active?: boolean
          created_at?: string
        }
      }
    }
  }
}

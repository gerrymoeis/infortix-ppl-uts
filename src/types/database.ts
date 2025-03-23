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
      categories: {
        Row: {
          id: string
          name: string
          name_en: string
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          name_en: string
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          name_en?: string
          slug?: string
          created_at?: string
          updated_at?: string
        }
      }
      competitions: {
        Row: {
          id: string
          title: string
          title_en: string | null
          description: string | null
          description_en: string | null
          organizer: string
          deadline: string
          registration_start: string | null
          registration_end: string | null
          category_id: string | null
          prize_pool: string | null
          requirements: string | null
          requirements_en: string | null
          registration_link: string | null
          image_url: string | null
          source_url: string | null
          source_platform: string | null
          last_scraped_at: string
          scraper_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          title_en?: string | null
          description?: string | null
          description_en?: string | null
          organizer: string
          deadline: string
          registration_start?: string | null
          registration_end?: string | null
          category_id?: string | null
          prize_pool?: string | null
          requirements?: string | null
          requirements_en?: string | null
          registration_link?: string | null
          image_url?: string | null
          source_url?: string | null
          source_platform?: string | null
          last_scraped_at?: string
          scraper_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          title_en?: string | null
          description?: string | null
          description_en?: string | null
          organizer?: string
          deadline?: string
          registration_start?: string | null
          registration_end?: string | null
          category_id?: string | null
          prize_pool?: string | null
          requirements?: string | null
          requirements_en?: string | null
          registration_link?: string | null
          image_url?: string | null
          source_url?: string | null
          source_platform?: string | null
          last_scraped_at?: string
          scraper_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      scraping_jobs: {
        Row: {
          id: string
          source: string
          status: string
          started_at: string
          completed_at: string | null
          items_processed: number
          items_added: number
          items_updated: number
          error_message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          source: string
          status: string
          started_at?: string
          completed_at?: string | null
          items_processed?: number
          items_added?: number
          items_updated?: number
          error_message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          source?: string
          status?: string
          started_at?: string
          completed_at?: string | null
          items_processed?: number
          items_added?: number
          items_updated?: number
          error_message?: string | null
          created_at?: string
        }
      }
      saved_competitions: {
        Row: {
          id: string
          user_id: string
          competition_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          competition_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          competition_id?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          competition_id: string
          type: string
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          competition_id: string
          type: string
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          competition_id?: string
          type?: string
          message?: string
          is_read?: boolean
          created_at?: string
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
  }
}

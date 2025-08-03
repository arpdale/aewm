export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          bio: string | null
          avatar_url: string | null
          role: 'admin' | 'editor' | 'contributor'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'editor' | 'contributor'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'editor' | 'contributor'
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          content: string | null
          excerpt: string | null
          status: 'draft' | 'published'
          location_city: string | null
          location_country: string | null
          address: string | null
          latitude: number | null
          longitude: number | null
          completion_year: number | null
          architect: string | null
          structural_engineer: string | null
          area_sqm: number | null
          area_sqft: number | null
          technical_details: Json
          ae_interests: string[] | null
          featured_image: string | null
          author_id: string | null
          view_count: number
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content?: string | null
          excerpt?: string | null
          status?: 'draft' | 'published'
          location_city?: string | null
          location_country?: string | null
          address?: string | null
          latitude?: number | null
          longitude?: number | null
          completion_year?: number | null
          architect?: string | null
          structural_engineer?: string | null
          area_sqm?: number | null
          area_sqft?: number | null
          technical_details?: Json
          ae_interests?: string[] | null
          featured_image?: string | null
          author_id?: string | null
          view_count?: number
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string | null
          excerpt?: string | null
          status?: 'draft' | 'published'
          location_city?: string | null
          location_country?: string | null
          address?: string | null
          latitude?: number | null
          longitude?: number | null
          completion_year?: number | null
          architect?: string | null
          structural_engineer?: string | null
          area_sqm?: number | null
          area_sqft?: number | null
          technical_details?: Json
          ae_interests?: string[] | null
          featured_image?: string | null
          author_id?: string | null
          view_count?: number
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      project_images: {
        Row: {
          id: string
          project_id: string
          url: string
          caption: string | null
          alt_text: string | null
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          url: string
          caption?: string | null
          alt_text?: string | null
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          url?: string
          caption?: string | null
          alt_text?: string | null
          order_index?: number
          created_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
      project_tags: {
        Row: {
          project_id: string
          tag_id: string
        }
        Insert: {
          project_id: string
          tag_id: string
        }
        Update: {
          project_id?: string
          tag_id?: string
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
      user_role: 'admin' | 'editor' | 'contributor'
      project_status: 'draft' | 'published'
    }
  }
}
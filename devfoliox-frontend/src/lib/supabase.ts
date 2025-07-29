import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Project {
  id: string
  title: string
  description: string
  tech_stack: string[]
  github_url?: string
  live_url?: string
  image_url?: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  published: boolean
  featured: boolean
  tags: string[]
  image_url?: string
  created_at: string
  updated_at: string
}

export interface LearningProgress {
  id: string
  title: string
  description: string
  category: string
  status: 'planned' | 'in_progress' | 'completed'
  progress_percentage: number
  notes?: string
  resources: string[]
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  name: string
  title: string
  bio: string
  email: string
  location: string
  avatar_url?: string
  resume_url?: string
  social_links: {
    github?: string
    linkedin?: string
    twitter?: string
    website?: string
  }
  skills: string[]
  updated_at: string
}


import { supabase, Project, BlogPost, LearningProgress, Profile } from './supabase'
import { demoProfile, demoProjects, demoBlogPosts, demoLearningProgress } from './demo-data'

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  return url && key && url !== 'https://demo.supabase.co' && key !== 'demo_anon_key'
}

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Projects API
export const projectsApi = {
  async getAll(): Promise<Project[]> {
    if (!isSupabaseConfigured()) {
      await delay(500) // Simulate network delay
      return demoProjects
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getFeatured(): Promise<Project[]> {
    if (!isSupabaseConfigured()) {
      await delay(500)
      return demoProjects.filter(p => p.featured)
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getById(id: string): Promise<Project | null> {
    if (!isSupabaseConfigured()) {
      await delay(300)
      return demoProjects.find(p => p.id === id) || null
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
    if (!isSupabaseConfigured()) {
      await delay(500)
      const newProject: Project = {
        ...project,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      return newProject
    }

    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<Project>): Promise<Project> {
    if (!isSupabaseConfigured()) {
      await delay(500)
      const existing = demoProjects.find(p => p.id === id)
      if (!existing) throw new Error('Project not found')
      return { ...existing, ...updates, updated_at: new Date().toISOString() }
    }

    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    if (!isSupabaseConfigured()) {
      await delay(500)
      return
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Blog Posts API
export const blogApi = {
  async getAll(): Promise<BlogPost[]> {
    if (!isSupabaseConfigured()) {
      await delay(500)
      return demoBlogPosts.filter(p => p.published)
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getFeatured(): Promise<BlogPost[]> {
    if (!isSupabaseConfigured()) {
      await delay(500)
      return demoBlogPosts.filter(p => p.published && p.featured)
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .eq('featured', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getBySlug(slug: string): Promise<BlogPost | null> {
    if (!isSupabaseConfigured()) {
      await delay(300)
      return demoBlogPosts.find(p => p.slug === slug && p.published) || null
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    
    if (error) throw error
    return data
  },

  async getAllForAdmin(): Promise<BlogPost[]> {
    if (!isSupabaseConfigured()) {
      await delay(500)
      return demoBlogPosts
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async create(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost> {
    if (!isSupabaseConfigured()) {
      await delay(500)
      const newPost: BlogPost = {
        ...post,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      return newPost
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .insert(post)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    if (!isSupabaseConfigured()) {
      await delay(500)
      const existing = demoBlogPosts.find(p => p.id === id)
      if (!existing) throw new Error('Blog post not found')
      return { ...existing, ...updates, updated_at: new Date().toISOString() }
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    if (!isSupabaseConfigured()) {
      await delay(500)
      return
    }

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Learning Progress API
export const learningApi = {
  async getAll(): Promise<LearningProgress[]> {
    if (!isSupabaseConfigured()) {
      await delay(500)
      return demoLearningProgress
    }

    const { data, error } = await supabase
      .from('learning_progress')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getByStatus(status: 'planned' | 'in_progress' | 'completed'): Promise<LearningProgress[]> {
    if (!isSupabaseConfigured()) {
      await delay(500)
      return demoLearningProgress.filter(l => l.status === status)
    }

    const { data, error } = await supabase
      .from('learning_progress')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async create(item: Omit<LearningProgress, 'id' | 'created_at' | 'updated_at'>): Promise<LearningProgress> {
    if (!isSupabaseConfigured()) {
      await delay(500)
      const newItem: LearningProgress = {
        ...item,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      return newItem
    }

    const { data, error } = await supabase
      .from('learning_progress')
      .insert(item)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<LearningProgress>): Promise<LearningProgress> {
    if (!isSupabaseConfigured()) {
      await delay(500)
      const existing = demoLearningProgress.find(l => l.id === id)
      if (!existing) throw new Error('Learning item not found')
      return { ...existing, ...updates, updated_at: new Date().toISOString() }
    }

    const { data, error } = await supabase
      .from('learning_progress')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    if (!isSupabaseConfigured()) {
      await delay(500)
      return
    }

    const { error } = await supabase
      .from('learning_progress')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Profile API
export const profileApi = {
  async get(): Promise<Profile | null> {
    if (!isSupabaseConfigured()) {
      await delay(300)
      return demoProfile
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)
      .single()
    
    if (error) throw error
    return data
  },

  async update(updates: Partial<Profile>): Promise<Profile> {
    if (!isSupabaseConfigured()) {
      await delay(500)
      return { ...demoProfile, ...updates, updated_at: new Date().toISOString() }
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Authentication API
export const authApi = {
  async signIn(email: string, password: string) {
    if (!isSupabaseConfigured()) {
      await delay(1000)
      // Demo authentication - accept any email/password combination
      if (email && password) {
        return {
          user: { id: 'demo-user', email },
          session: { access_token: 'demo-token', user: { id: 'demo-user', email } }
        }
      }
      throw new Error('Invalid credentials')
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  async signOut() {
    if (!isSupabaseConfigured()) {
      await delay(500)
      return
    }

    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getUser() {
    if (!isSupabaseConfigured()) {
      return null
    }

    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  async getSession() {
    if (!isSupabaseConfigured()) {
      return null
    }

    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  }
}


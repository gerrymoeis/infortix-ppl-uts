import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseEmail = process.env.NEXT_PUBLIC_SUPABASE_EMAIL
const supabasePassword = process.env.NEXT_PUBLIC_SUPABASE_PASSWORD

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required Supabase environment variables')
}

// Create the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Ensure we have a valid session
async function ensureSession() {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session && supabaseEmail && supabasePassword) {
      console.log('No session found, signing in with email...')
      const { error } = await supabase.auth.signInWithPassword({
        email: supabaseEmail,
        password: supabasePassword
      })
      
      if (error) {
        console.error('Error signing in:', error)
        throw error
      }
      console.log('Signed in successfully')
    } else if (!session) {
      console.log('No session and no credentials available')
    }
  } catch (error) {
    console.error('Error in ensureSession:', error)
    throw error
  }
}

// Helper functions for competitions
export async function getCompetitions() {
  try {
    await ensureSession()
    
    console.log('Fetching competitions...')
    const { data, error } = await supabase
      .from('competitions')
      .select(`
        *,
        categories (
          name,
          name_en,
          slug
        )
      `)
      .order('deadline', { ascending: true })
    
    if (error) {
      console.error('Error fetching competitions:', error)
      return []
    }

    // Process the data to ensure dates are properly formatted
    const processedData = data?.map(competition => {
      // Log each competition for debugging
      console.log(`Processing competition: ${competition.title}`)
      console.log(`- Organizer: ${competition.organizer}`)
      console.log(`- Deadline: ${competition.deadline}`)
      
      // Ensure deadline is properly formatted
      if (competition.deadline) {
        try {
          // Validate the date by parsing and reformatting
          const date = new Date(competition.deadline)
          if (isNaN(date.getTime())) {
            console.warn(`Invalid deadline for ${competition.title}: ${competition.deadline}`)
            // Set to a future date to avoid showing as expired
            competition.deadline = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        } catch (e) {
          console.error(`Error processing date for ${competition.title}:`, e)
        }
      }
      
      return competition
    }) || []

    console.log(`Fetched ${processedData.length} competitions`)
    return processedData
  } catch (e) {
    console.error('Unexpected error:', e)
    return []
  }
}

// Helper functions for categories
export async function getCategories() {
  try {
    await ensureSession()
    
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true })
    
    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }

    return data || []
  } catch (e) {
    console.error('Unexpected error:', e)
    return []
  }
}

// Get a single competition by ID
export async function getCompetitionById(id: string) {
  if (!id) return null
  
  try {
    await ensureSession()
    
    const { data, error } = await supabase
      .from('competitions')
      .select(`
        *,
        categories (
          name,
          name_en,
          slug
        )
      `)
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching competition by id:', error)
      return null
    }

    return data
  } catch (e) {
    console.error('Unexpected error:', e)
    return null
  }
}

// Get a single competition by ID
export async function getScrapingJobById(id: string) {
  try {
    await ensureSession()
    
    const { data, error } = await supabase
      .from('scraping_jobs')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching scraping job by id:', error)
      return null
    }

    return data
  } catch (e) {
    console.error('Unexpected error:', e)
    return null
  }
}

// Helper functions for scraping jobs
export async function getLatestScrapingJobs() {
  try {
    await ensureSession()
    
    const { data, error } = await supabase
      .from('scraping_jobs')
      .select('*')
    
    if (error) {
      console.error('Error fetching scraping jobs:', error)
      return []
    }

    console.log('Raw scraping jobs data:', data)
    return data || []
  } catch (e) {
    console.error('Unexpected error:', e)
    return []
  }
}

'use client'

import { createContext, useContext, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const Context = createContext({})

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          const email = process.env.NEXT_PUBLIC_SUPABASE_EMAIL
          const password = process.env.NEXT_PUBLIC_SUPABASE_PASSWORD
          
          if (email && password) {
            console.log('Initializing session with email...')
            const { error } = await supabase.auth.signInWithPassword({
              email,
              password
            })
            
            if (error) {
              console.error('Error signing in:', error)
              throw error
            }
            console.log('Session initialized')
          } else {
            console.log('No credentials available for auto-login')
          }
        } else {
          console.log('Session already exists')
        }
      } catch (error) {
        console.error('Error initializing Supabase:', error)
      }
    }

    initializeSupabase()
  }, [])

  return (
    <Context.Provider value={{}}>
      {children}
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  }
  return context
}

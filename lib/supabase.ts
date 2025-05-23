import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for the browser
let browserClient: ReturnType<typeof createClient> | null = null

export const getSupabaseBrowserClient = () => {
  if (typeof window === "undefined") {
    return null // Don't create a client on the server
  }

  if (!browserClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    browserClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return browserClient
}

// Create a supabase client for server components
let serverClient: ReturnType<typeof createClient> | null = null

export const getSupabaseServerClient = () => {
  if (serverClient) {
    return serverClient
  }

  const supabaseUrl = process.env.SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  serverClient = createClient(supabaseUrl, supabaseServiceKey)
  return serverClient
}

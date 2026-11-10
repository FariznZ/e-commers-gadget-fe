import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wyexctbuabgkrgaohzbc.supabase.co'
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_6A-1ewIRg7RLUCLfGWQeNg_ZSbr3lAP'

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Peringatan: URL atau Key Supabase belum diisi di file .env!')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Menggunakan sessionStorage agar setiap kali tab/browser ditutup dan dinyalakan kembali,
    // pengguna akan diarahkan ke halaman login terlebih dahulu
    storage: typeof window !== 'undefined' ? window.sessionStorage : undefined,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

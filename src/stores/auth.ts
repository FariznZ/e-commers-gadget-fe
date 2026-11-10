import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'
import type { User } from '@/types'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isInitialized = ref(false)
  const isLoading = ref(false)
  const authError = ref<string | null>(null)

  const isAuthenticated = computed(() => user.value !== null)

  function mapSupabaseUser(sbUser: SupabaseUser): User {
    const meta = sbUser.user_metadata || {}
    const email = sbUser.email || ''
    const fallbackName = email.split('@')[0] || 'Pengguna'
    return {
      id: sbUser.id,
      name: meta.name || meta.full_name || fallbackName,
      email: email,
      phone: meta.phone || '0812 3456 7890',
      address: meta.address || 'Jl. Kemang Raya No. 12',
      city: meta.city || 'Jakarta Selatan',
      postalCode: meta.postalCode || '12730',
      membership: meta.membership || 'Member OOLAMA',
    }
  }

  function translateError(rawMsg: string): string {
    const lower = rawMsg.toLowerCase()
    if (lower.includes('invalid login credentials')) {
      return 'Email atau kata sandi yang Anda masukkan salah.'
    }
    if (lower.includes('email rate limit exceeded')) {
      return 'Batas pengiriman email Supabase tercapai. Silakan coba beberapa saat lagi.'
    }
    if (lower.includes('user already registered') || lower.includes('already exists')) {
      return 'Email ini sudah terdaftar. Silakan langsung masuk ke akun Anda.'
    }
    if (lower.includes('password should be at least 6 characters')) {
      return 'Kata sandi minimal harus 6 karakter.'
    }
    if (lower.includes('invalid') && lower.includes('email')) {
      return 'Format email tidak valid. Gunakan email yang benar (misal @gmail.com).'
    }
    return rawMsg
  }

  async function init() {
    try {
      const { data } = await supabase.auth.getSession()
      if (data.session?.user) {
        user.value = mapSupabaseUser(data.session.user)
      } else {
        user.value = null
      }
    } catch (err) {
      console.error('Error saat memeriksa sesi Supabase:', err)
      user.value = null
    } finally {
      isInitialized.value = true
    }

    // Listener realtime untuk memantau status login/logout
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        user.value = mapSupabaseUser(session.user)
      } else {
        user.value = null
      }
    })
  }

  async function login(
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> {
    isLoading.value = true
    authError.value = null
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error) {
        const msg = translateError(error.message)
        authError.value = msg
        return { success: false, error: msg }
      }

      if (data.user) {
        user.value = mapSupabaseUser(data.user)
        return { success: true }
      }

      return { success: false, error: 'Data akun tidak ditemukan.' }
    } catch (err: any) {
      const msg = translateError(err?.message || 'Gagal masuk ke akun.')
      authError.value = msg
      return { success: false, error: msg }
    } finally {
      isLoading.value = false
    }
  }

  async function register(
    name: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<{ success: boolean; error?: string; requireVerification?: boolean }> {
    isLoading.value = true
    authError.value = null
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name: name.trim(),
            phone: phone.trim(),
            membership: 'Member OOLAMA',
          },
        },
      })

      if (error) {
        const msg = translateError(error.message)
        authError.value = msg
        return { success: false, error: msg }
      }

      if (data.user) {
        // Jika registrasi langsung menghasilkan sesi (tanpa konfirmasi email)
        if (data.session?.user) {
          user.value = mapSupabaseUser(data.session.user)
          return { success: true, requireVerification: false }
        }
        // Jika butuh konfirmasi email oleh Supabase
        return { success: true, requireVerification: true }
      }

      return { success: false, error: 'Pendaftaran gagal.' }
    } catch (err: any) {
      const msg = translateError(err?.message || 'Gagal mendaftar akun.')
      authError.value = msg
      return { success: false, error: msg }
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    isLoading.value = true
    try {
      await supabase.auth.signOut()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      user.value = null
      isLoading.value = false
    }
  }

  return {
    user,
    isAuthenticated,
    isInitialized,
    isLoading,
    authError,
    init,
    login,
    register,
    logout,
  }
})

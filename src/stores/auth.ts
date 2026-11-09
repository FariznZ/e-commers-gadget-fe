import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types'

const demoUser: User = {
  name: 'Andika Pratama',
  email: 'andika.pratama@email.com',
  phone: '0812 3456 7890',
  address: 'Jl. Kemang Raya No. 12, RT 03/RW 02',
  city: 'Jakarta Selatan / Mampang Prapatan',
  postalCode: '12730',
  membership: 'Member Gold',
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(demoUser)
  const isAuthenticated = computed(() => user.value !== null)

  function login(email: string) {
    user.value = {
      ...demoUser,
      email: email || demoUser.email,
    }
  }

  function register(name: string, email: string) {
    user.value = {
      ...demoUser,
      name: name || demoUser.name,
      email: email || demoUser.email,
    }
  }

  function logout() {
    user.value = null
  }

  return { user, isAuthenticated, login, register, logout }
})

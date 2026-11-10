<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FormField from '@/components/FormField.vue'
import Icon from '@/components/Icon.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const form = reactive({ email: '', password: '' })
const remember = ref(true)
const submitted = ref(false)
const errorMessage = ref('')

async function submit() {
  submitted.value = true
  errorMessage.value = ''
  if (!form.email || !form.password) return

  const result = await auth.login(form.email, form.password)
  if (result.success) {
    const redirectPath =
      typeof route.query.redirect === 'string' && route.query.redirect !== '/masuk'
        ? route.query.redirect
        : '/'
    router.push(redirectPath)
  } else {
    errorMessage.value = result.error || 'Gagal masuk. Silakan periksa kembali email & kata sandi.'
  }
}
</script>

<template>
  <div class="screen auth">
    <div class="auth-top">
      <span class="brand">OOLAMA</span>
    </div>

    <div class="body">
      <header class="intro">
        <h1 class="h1">Masuk ke<br />akunmu</h1>
        <p class="muted text-sm">
          Masuk dengan akun Supabase untuk mulai menjelajah produk dan berbelanja.
        </p>
      </header>

      <form class="card card-pad form" @submit.prevent="submit">
        <div v-if="errorMessage" class="alert-error">
          <Icon name="help" :size="16" />
          <span>{{ errorMessage }}</span>
        </div>

        <FormField
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="nama@email.com"
          autocomplete="email"
          hint="Gunakan email yang terdaftar di database Supabase"
        />
        <FormField
          v-model="form.password"
          label="Kata sandi"
          type="password"
          placeholder="Masukkan kata sandi"
          autocomplete="current-password"
        />

        <div class="row between options">
          <label class="remember">
            <input v-model="remember" type="checkbox" />
            <span>Ingat saya di sesi ini</span>
          </label>
        </div>

        <button
          class="btn btn-primary btn-block"
          type="submit"
          :disabled="auth.isLoading"
        >
          {{ auth.isLoading ? 'Sedang masuk...' : 'Masuk' }}
        </button>

        <p v-if="submitted && (!form.email || !form.password)" class="error">
          Email dan kata sandi wajib diisi.
        </p>
      </form>

      <p class="switch">
        Belum punya akun?
        <RouterLink to="/daftar" class="link-strong">Daftar Akun Baru</RouterLink>
      </p>

      <p class="terms">
        Terhubung langsung ke otentikasi aman Supabase.
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth {
  background: var(--white);
}

.auth-top {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 58px;
  padding: 0 20px;
  border-bottom: 1px solid var(--line);
}

.body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 20px 28px;
}

.intro {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.intro p {
  line-height: 1.5;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.alert-error {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  font-size: 11px;
  line-height: 1.4;
}

.alert-error :deep(svg) {
  flex: none;
  margin-top: 1px;
}

.options {
  font-size: 11px;
}

.remember {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--muted);
  cursor: pointer;
}

.remember input {
  width: 15px;
  height: 15px;
  accent-color: var(--accent);
  margin: 0;
}

.error {
  font-size: 11px;
  color: var(--accent);
}

.switch {
  margin-top: 12px;
  font-size: 12px;
  text-align: center;
  color: var(--muted);
}

.link-strong {
  font-weight: 600;
  color: var(--accent);
}

.terms {
  font-size: 10px;
  line-height: 1.5;
  text-align: center;
  color: var(--muted);
  margin-top: auto;
}
</style>

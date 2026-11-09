<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FormField from '@/components/FormField.vue'
import Icon from '@/components/Icon.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const form = reactive({ email: 'andika.pratama@email.com', password: 'rama12345' })
const remember = ref(true)
const submitted = ref(false)

function submit() {
  submitted.value = true
  if (!form.email || !form.password) return
  auth.login(form.email)
  router.push(typeof route.query.redirect === 'string' ? route.query.redirect : '/')
}
</script>

<template>
  <div class="screen auth">
    <div class="auth-top">
      <button class="icon-btn" type="button" aria-label="Kembali" @click="router.back()">
        <Icon name="arrow-left" :size="22" />
      </button>
      <span class="brand">rama</span>
    </div>

    <div class="body">
      <header class="intro">
        <h1 class="h1">Masuk ke<br />akunmu</h1>
        <p class="muted text-sm">Lanjut belanja barang favoritmu dengan satu akun.</p>
      </header>

      <form class="card card-pad form" @submit.prevent="submit">
        <FormField
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="nama@email.com"
          autocomplete="email"
          hint="Coba akun demo: andika.pratama@email.com"
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
            <span>Ingat saya</span>
          </label>
          <button class="link" type="button">Lupa kata sandi?</button>
        </div>

        <button class="btn btn-primary btn-block" type="submit">Masuk</button>
        <p v-if="submitted && (!form.email || !form.password)" class="error">
          Email dan kata sandi wajib diisi.
        </p>
      </form>

      <div class="or">
        <span>atau</span>
      </div>

      <div class="socials">
        <button class="btn btn-outline" type="button" @click="submit">
          <Icon name="globe" :size="18" />
          Google
        </button>
        <button class="btn btn-outline" type="button" @click="submit">
          <Icon name="store" :size="18" />
          Apple
        </button>
      </div>

      <p class="switch">
        Belum punya akun?
        <RouterLink to="/daftar" class="link-strong">Daftar</RouterLink>
      </p>

      <p class="terms">
        Dengan masuk, kamu menyetujui Ketentuan Layanan dan Kebijakan Privasi rama.
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
  gap: 14px;
  height: 58px;
  padding: 0 20px;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 20px 28px;
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

.link {
  padding: 0;
  border: 0;
  background: transparent;
  font-size: 11px;
  font-weight: 600;
  color: var(--accent);
  cursor: pointer;
}

.error {
  font-size: 11px;
  color: var(--accent);
}

.or {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  color: var(--muted);
}

.or::before,
.or::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--line);
}

.socials {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.socials .btn {
  height: 46px;
  font-size: 12px;
  color: var(--ink);
}

.switch {
  margin-top: 4px;
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
}
</style>

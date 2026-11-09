<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import FormField from '@/components/FormField.vue'
import Icon from '@/components/Icon.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({ name: '', email: '', phone: '', password: '' })
const agreed = ref(false)
const submitted = ref(false)

const isValid = () =>
  Boolean(form.name && form.email && form.phone && form.password.length >= 6 && agreed.value)

function submit() {
  submitted.value = true
  if (!isValid()) return
  auth.register(form.name, form.email)
  router.push('/')
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
        <h1 class="h1">Buat akun<br />baru</h1>
        <p class="muted text-sm">Daftar gratis dan mulai kumpulkan voucher belanja.</p>
      </header>

      <form class="card card-pad form" @submit.prevent="submit">
        <FormField v-model="form.name" label="Nama lengkap" placeholder="Nama lengkap" autocomplete="name" />
        <FormField v-model="form.email" label="Email" type="email" placeholder="nama@email.com" autocomplete="email" />
        <FormField v-model="form.phone" label="Nomor HP" type="tel" placeholder="08xx xxxx xxxx" autocomplete="tel" />
        <FormField
          v-model="form.password"
          label="Kata sandi"
          type="password"
          placeholder="Minimal 6 karakter"
          autocomplete="new-password"
          hint="Gunakan kombinasi huruf dan angka agar aman."
        />

        <label class="agree">
          <input v-model="agreed" type="checkbox" />
          <span>
            Saya menyetujui <strong>Ketentuan Layanan</strong> dan <strong>Kebijakan Privasi</strong> rama.
          </span>
        </label>

        <button class="btn btn-primary btn-block" type="submit">Daftar</button>
        <p v-if="submitted && !isValid()" class="error">
          Lengkapi data, gunakan kata sandi minimal 6 karakter, dan setujui ketentuan.
        </p>
      </form>

      <p class="switch">
        Sudah punya akun?
        <RouterLink to="/masuk" class="link-strong">Masuk</RouterLink>
      </p>

      <p class="terms">Data kamu hanya dipakai untuk simulasi belanja di aplikasi ini.</p>
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

.agree {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 11px;
  line-height: 1.5;
  color: var(--muted);
  cursor: pointer;
}

.agree input {
  width: 15px;
  height: 15px;
  margin: 1px 0 0;
  accent-color: var(--accent);
  flex: none;
}

.agree strong {
  font-weight: 600;
  color: var(--ink);
}

.error {
  font-size: 11px;
  color: var(--accent);
}

.switch {
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

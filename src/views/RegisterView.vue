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
const errorMessage = ref('')
const successMessage = ref('')

const isValid = () =>
  Boolean(form.name && form.email && form.phone && form.password.length >= 6 && agreed.value)

async function submit() {
  submitted.value = true
  errorMessage.value = ''
  successMessage.value = ''
  if (!isValid()) return

  const result = await auth.register(form.name, form.email, form.phone, form.password)
  if (result.success) {
    if (result.requireVerification) {
      successMessage.value =
        'Akun berhasil dibuat! Silakan cek email Anda untuk konfirmasi, lalu masuk.'
      window.setTimeout(() => {
        router.push('/masuk')
      }, 2500)
    } else {
      router.push('/')
    }
  } else {
    errorMessage.value = result.error || 'Pendaftaran gagal. Periksa kembali data Anda.'
  }
}
</script>

<template>
  <div class="screen auth">
    <div class="auth-top">
      <button class="icon-btn" type="button" aria-label="Kembali" @click="router.back()">
        <Icon name="arrow-left" :size="22" />
      </button>
      <span class="brand">OOLAMA</span>
    </div>

    <div class="body">
      <header class="intro">
        <h1 class="h1">Buat akun<br />baru</h1>
        <p class="muted text-sm">Daftar akun belanja Supabase untuk mendapatkan voucher dan promo.</p>
      </header>

      <form class="card card-pad form" @submit.prevent="submit">
        <div v-if="errorMessage" class="alert-error">
          <Icon name="help" :size="16" />
          <span>{{ errorMessage }}</span>
        </div>

        <div v-if="successMessage" class="alert-success">
          <Icon name="check" :size="16" />
          <span>{{ successMessage }}</span>
        </div>

        <FormField
          v-model="form.name"
          label="Nama lengkap"
          placeholder="Nama lengkap"
          autocomplete="name"
        />
        <FormField
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="nama@email.com"
          autocomplete="email"
          hint="Gunakan format email valid (contoh: user@gmail.com)"
        />
        <FormField
          v-model="form.phone"
          label="Nomor HP"
          type="tel"
          placeholder="08xx xxxx xxxx"
          autocomplete="tel"
        />
        <FormField
          v-model="form.password"
          label="Kata sandi"
          type="password"
          placeholder="Minimal 6 karakter"
          autocomplete="new-password"
          hint="Gunakan minimal 6 karakter agar aman."
        />

        <label class="agree">
          <input v-model="agreed" type="checkbox" />
          <span>
            Saya menyetujui <strong>Ketentuan Layanan</strong> dan <strong>Kebijakan Privasi</strong> OOLAMA.
          </span>
        </label>

        <button
          class="btn btn-primary btn-block"
          type="submit"
          :disabled="auth.isLoading"
        >
          {{ auth.isLoading ? 'Mendaftarkan akun...' : 'Daftar' }}
        </button>

        <p v-if="submitted && !isValid()" class="error">
          Lengkapi seluruh data, gunakan kata sandi minimal 6 karakter, dan setujui ketentuan.
        </p>
      </form>

      <p class="switch">
        Sudah punya akun?
        <RouterLink to="/masuk" class="link-strong">Masuk</RouterLink>
      </p>

      <p class="terms">Akun tersimpan aman dan terenkripsi di Supabase Authentication.</p>
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

.alert-success {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #16a34a;
  font-size: 11px;
  line-height: 1.4;
}

.alert-success :deep(svg) {
  flex: none;
  margin-top: 1px;
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

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '@/components/Icon.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const initials = computed(() =>
  (auth.user?.name ?? 'OOLAMA')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase(),
)

const stats = [
  { label: 'Pesanan', value: '12' },
  { label: 'Voucher', value: '4' },
  { label: 'Ulasan', value: '8' },
]

const accountMenus = [
  { icon: 'package', title: 'Pesanan saya', hint: '12 pesanan', to: '/pesanan' },
  { icon: 'map-pin', title: 'Alamat pengiriman', hint: 'Rumah · Jakarta Selatan', to: '' },
  { icon: 'ticket', title: 'Voucher & promo', hint: '4 tersedia', to: '' },
  { icon: 'star', title: 'Ulasan saya', hint: '8 ulasan', to: '' },
]

const settingsMenus = [
  { icon: 'lock', title: 'Keamanan akun', hint: '', to: '' },
  { icon: 'bell', title: 'Notifikasi', hint: 'Aktif', to: '' },
  { icon: 'globe', title: 'Bahasa', hint: 'Indonesia', to: '' },
  { icon: 'help', title: 'Bantuan', hint: '', to: '' },
]

function open(to: string) {
  if (to) router.push(to)
}

async function logout() {
  await auth.logout()
  router.push('/masuk')
}
</script>

<template>
  <div class="screen">
    <header class="top">
      <span class="brand">OOLAMA</span>
      <button class="icon-btn" type="button" aria-label="Notifikasi">
        <Icon name="bell" :size="22" />
      </button>
    </header>

    <div v-if="auth.user" class="body">
      <section class="card identity">
        <div class="avatar">{{ initials }}</div>
        <div class="grow">
          <p class="name">{{ auth.user.name }}</p>
          <span class="pill pill-green membership">{{ auth.user.membership }}</span>
          <p class="muted text-xs email">{{ auth.user.email }}</p>
        </div>
        <Icon name="chevron-right" :size="17" class="muted" />
      </section>

      <section class="card stats">
        <div v-for="stat in stats" :key="stat.label" class="stat">
          <strong>{{ stat.value }}</strong>
          <span>{{ stat.label }}</span>
        </div>
      </section>

      <section class="group">
        <p class="group-label">Akun</p>
        <div class="card menu">
          <button
            v-for="(menu, index) in accountMenus"
            :key="menu.title"
            class="menu-item"
            :class="{ border: index < accountMenus.length - 1 }"
            type="button"
            @click="open(menu.to)"
          >
            <span class="menu-icon"><Icon :name="menu.icon" :size="18" /></span>
            <span class="menu-title">{{ menu.title }}</span>
            <span v-if="menu.hint" class="menu-hint">{{ menu.hint }}</span>
            <Icon name="chevron-right" :size="15" class="muted" />
          </button>
        </div>
      </section>

      <section class="group">
        <p class="group-label">Pengaturan</p>
        <div class="card menu">
          <button
            v-for="(menu, index) in settingsMenus"
            :key="menu.title"
            class="menu-item"
            :class="{ border: index < settingsMenus.length - 1 }"
            type="button"
            @click="open(menu.to)"
          >
            <span class="menu-icon"><Icon :name="menu.icon" :size="18" /></span>
            <span class="menu-title">{{ menu.title }}</span>
            <span v-if="menu.hint" class="menu-hint">{{ menu.hint }}</span>
            <Icon name="chevron-right" :size="15" class="muted" />
          </button>
        </div>
      </section>

      <button class="logout" type="button" @click="logout">
        <Icon name="arrow-left" :size="17" />
        Keluar dari akun
      </button>

      <p class="version">OOLAMA v1.0.0 · Supabase Auth Connected</p>
    </div>

    <div v-else class="guest">
      <Icon name="user" :size="30" />
      <p>Kamu belum masuk.</p>
      <RouterLink to="/masuk" class="btn btn-primary">Masuk ke akun</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 58px;
  padding: 0 20px;
  background: var(--white);
}

.body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 20px 24px;
}

.identity {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 54px;
  height: 54px;
  border-radius: 999px;
  background: var(--tint-accent);
  color: var(--accent);
  font-size: 18px;
  font-weight: 700;
}

.name {
  font-size: 15px;
  font-weight: 600;
}

.membership {
  margin: 4px 0;
}

.email {
  margin-top: 2px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 14px 0;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}

.stat + .stat {
  border-left: 1px solid var(--line);
}

.stat strong {
  font-size: 17px;
  font-weight: 700;
}

.stat span {
  font-size: 10px;
  color: var(--muted);
}

.group-label {
  margin: 4px 0 7px 2px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
}

.menu {
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  padding: 12px 14px;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.menu-item.border {
  border-bottom: 1px solid var(--line);
}

.menu-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: var(--tint-accent);
  color: var(--accent);
  flex: none;
}

.menu-title {
  flex: 1;
  font-size: 13px;
  font-weight: 500;
}

.menu-hint {
  font-size: 10px;
  color: var(--muted);
}

.logout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  height: 46px;
  margin-top: 2px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--white);
  color: var(--accent);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.version {
  font-size: 10px;
  text-align: center;
  color: var(--muted);
}

.guest {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px 20px;
  color: var(--muted);
  font-size: 13px;
}

.guest .btn {
  height: 42px;
  padding: 0 20px;
  font-size: 13px;
}
</style>

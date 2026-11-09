<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Icon from '@/components/Icon.vue'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const cart = useCartStore()

const items = [
  { key: 'beranda', label: 'Beranda', icon: 'home', to: '/' },
  { key: 'jelajah', label: 'Jelajah', icon: 'compass', to: '/jelajah' },
  { key: 'keranjang', label: 'Keranjang', icon: 'cart', to: '/keranjang' },
  { key: 'akun', label: 'Akun', icon: 'user', to: '/profil' },
]

const activeKey = computed(() => {
  if (typeof route.meta.navActive === 'string') return route.meta.navActive
  return route.path
})
</script>

<template>
  <nav class="bottom-nav" aria-label="Navigasi utama">
    <RouterLink
      v-for="item in items"
      :key="item.key"
      :to="item.to"
      class="nav-item"
      :class="{ active: activeKey === item.key }"
    >
      <span class="icon-slot">
        <Icon :name="item.icon" :size="22" />
        <span v-if="item.key === 'keranjang' && cart.count > 0" class="badge">{{ cart.count }}</span>
      </span>
      <span class="label">{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.bottom-nav {
  position: sticky;
  bottom: 0;
  z-index: 30;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 8px 12px calc(8px + env(safe-area-inset-bottom));
  background: var(--white);
  border-top: 1px solid var(--line);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 4px 0 2px;
  color: var(--muted);
}

.nav-item.active {
  color: var(--accent);
}

.icon-slot {
  position: relative;
  display: inline-flex;
}

.badge {
  position: absolute;
  top: -4px;
  right: -8px;
  min-width: 15px;
  height: 15px;
  padding: 0 4px;
  border-radius: 999px;
  background: var(--accent);
  color: var(--white);
  font-size: 9px;
  font-weight: 600;
  line-height: 15px;
  text-align: center;
}

.label {
  font-size: 10px;
  font-weight: 400;
}

.nav-item.active .label {
  font-weight: 600;
}
</style>

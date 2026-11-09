<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import Icon from '@/components/Icon.vue'
import { orders } from '@/data/orders'
import { getProduct } from '@/data/products'
import { useCartStore } from '@/stores/cart'
import { formatIDR } from '@/utils/format'
import type { Order } from '@/types'

const router = useRouter()
const cart = useCartStore()

const tabs = ['Semua', 'Diproses', 'Dikirim', 'Selesai'] as const
const activeTab = ref<(typeof tabs)[number]>('Semua')

const statusByTab: Record<string, Order['status'][]> = {
  Semua: ['paid', 'done'],
  Diproses: ['paid'],
  Dikirim: [],
  Selesai: ['done'],
}

const filtered = computed(() =>
  activeTab.value === 'Semua'
    ? orders
    : orders.filter((order) => statusByTab[activeTab.value].includes(order.status)),
)

function reorder(order: Order) {
  order.lines.forEach((line) => {
    const product = getProduct(line.productId)
    if (product) {
      for (let i = 0; i < line.quantity; i += 1) cart.add(product, line.variant)
    }
  })
  router.push('/keranjang')
}

function statusTone(order: Order) {
  return order.status === 'paid' ? 'pill-accent' : 'pill-green'
}
</script>

<template>
  <div class="screen">
    <AppHeader title="Riwayat pesanan" back>
      <template #action>
        <RouterLink to="/keranjang" class="icon-btn" aria-label="Keranjang">
          <Icon name="cart" :size="22" />
        </RouterLink>
      </template>
    </AppHeader>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="tab"
        :class="{ active: activeTab === tab }"
        type="button"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <div class="body">
      <article v-for="order in filtered" :key="order.id" class="card order">
        <div class="row between order-head">
          <span class="reference">{{ order.reference }}</span>
          <span class="pill" :class="statusTone(order)">{{ order.statusLabel }}</span>
        </div>
        <p class="muted text-xs meta">{{ order.date }}</p>
        <div class="divider" />

        <div v-for="line in order.lines" :key="`${order.id}-${line.productId}-${line.variant}`" class="order-item">
          <div
            class="thumb order-thumb"
            :class="`tone-${getProduct(line.productId)?.tone ?? 1}`"
          />
          <div class="grow">
            <p class="item-name">{{ getProduct(line.productId)?.name }}</p>
            <p class="muted text-xs">{{ line.variant }} · {{ line.quantity }} barang</p>
            <p class="item-price">{{ formatIDR(line.price) }}</p>
          </div>
        </div>

        <div class="divider" />

        <div class="total-row">
          <span class="muted text-xs">{{ order.lines.length }} produk · Total belanja</span>
          <strong>{{ formatIDR(order.total) }}</strong>
        </div>

        <p v-if="order.note" class="note">
          <Icon name="package" :size="14" />
          {{ order.note }}
        </p>

        <div class="actions">
          <button class="btn btn-soft" type="button" @click="reorder(order)">Beli lagi</button>
          <button class="btn btn-outline" type="button">Hubungi penjual</button>
        </div>
      </article>

      <div v-if="!filtered.length" class="empty card">
        <Icon name="package" :size="26" />
        <p>Belum ada pesanan di tab ini.</p>
        <RouterLink to="/jelajah" class="btn btn-primary">Cari produk</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 22px;
  padding: 0 20px;
  background: var(--white);
}

.tab {
  position: relative;
  height: 41px;
  padding: 0;
  border: 0;
  background: transparent;
  font-size: 12px;
  color: var(--muted);
  cursor: pointer;
}

.tab.active {
  color: var(--accent);
  font-weight: 600;
}

.tab.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  border-radius: 2px;
  background: var(--accent);
}

.body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 20px 24px;
}

.order {
  overflow: hidden;
  padding-top: 14px;
}

.order-head {
  padding: 0 16px;
}

.reference {
  font-size: 13px;
  font-weight: 600;
}

.meta {
  padding: 3px 16px 12px;
}

.divider {
  margin: 0 16px;
}

.order-item {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
}

.order-thumb {
  flex: none;
  width: 52px;
  height: 60px;
  border-radius: 8px;
}

.item-name {
  font-size: 12px;
  font-weight: 500;
}

.item-price {
  margin-top: 5px;
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
}

.total-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 12px 16px;
}

.total-row strong {
  font-size: 15px;
  font-weight: 700;
}

.note {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 16px 12px;
  padding: 8px 10px;
  border-radius: var(--radius-md);
  background: var(--tint-accent);
  color: var(--accent);
  font-size: 10px;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 0 16px 16px;
}

.actions .btn {
  height: 40px;
  font-size: 12px;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 32px 20px;
  color: var(--muted);
  font-size: 12px;
}

.empty .btn {
  height: 40px;
  padding: 0 18px;
  font-size: 12px;
}
</style>

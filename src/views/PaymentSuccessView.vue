<script setup lang="ts">
import { computed, ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import Icon from '@/components/Icon.vue'
import SummaryRow from '@/components/SummaryRow.vue'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { formatIDR } from '@/utils/format'

const cart = useCartStore()
const auth = useAuthStore()

const orderNumber = 'RMA-20261109-001'
const copied = ref(false)

const firstName = computed(() => (auth.user?.name ?? 'Alya').split(' ')[0])

async function copyReference() {
  try {
    await navigator.clipboard.writeText(orderNumber)
    copied.value = true
    window.setTimeout(() => (copied.value = false), 1600)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <div class="screen">
    <AppHeader title="Pembayaran" back>
      <template #action>
        <RouterLink to="/" class="icon-btn" aria-label="Tutup">
          <Icon name="x" :size="22" />
        </RouterLink>
      </template>
    </AppHeader>

    <div class="body">
      <section class="success">
        <div class="success-symbol">
          <Icon name="check-circle" :size="42" :stroke-width="1.6" />
        </div>
        <h1 class="h2">Yeay, pembayaran berhasil!</h1>
        <p class="muted text-sm">
          Terima kasih, {{ firstName }}. Pesananmu sudah dibuat dan siap diproses oleh penjual.
        </p>
        <span class="pill pill-green">Lunas · paid</span>
      </section>

      <section class="card receipt">
        <div class="row between reference">
          <span class="ref-number">{{ orderNumber }}</span>
          <button class="copy" type="button" aria-label="Salin nomor pesanan" @click="copyReference">
            <Icon :name="copied ? 'check' : 'copy'" :size="16" />
          </button>
        </div>
        <p class="muted text-xs">9 Nov 2026 · 09.41 WIB</p>
        <div class="divider" />

        <div v-for="entry in cart.detailed" :key="`${entry.product.id}-${entry.line.variant}`" class="receipt-item">
          <div class="thumb receipt-thumb" :class="`tone-${entry.product.tone}`" />
          <div class="grow">
            <p class="item-name">{{ entry.product.name }}</p>
            <p class="muted text-xs">{{ entry.line.variant }} · {{ entry.line.quantity }} barang</p>
            <p class="item-price">{{ formatIDR(entry.product.price * entry.line.quantity) }}</p>
          </div>
        </div>

        <div class="divider" />
        <div class="summary-rows">
          <SummaryRow :label="`Total harga (${cart.selectedCount} barang)`" :value="formatIDR(cart.subtotal)" />
          <SummaryRow label="Voucher HEMAT20" value="−Rp20.000" tone="green" />
          <SummaryRow label="Ongkos kirim" value="Gratis" tone="green" />
          <div class="divider" />
          <SummaryRow label="Total dibayar" :value="formatIDR(cart.total)" strong tone="accent" />
        </div>
      </section>

      <section class="next-step">
        <Icon name="package" :size="22" />
        <div>
          <p class="next-title">Selanjutnya, pesanan disiapkan</p>
          <p class="muted text-xs">Dikirim ke Jakarta Selatan · Tiba 11–13 Nov</p>
        </div>
      </section>

      <p class="simulation">Pembayaran simulasi selesai · Tidak ada tagihan nyata</p>

      <div class="actions">
        <RouterLink to="/pesanan" class="btn btn-primary btn-block">Lihat pesanan</RouterLink>
        <RouterLink to="/" class="btn btn-soft btn-block">Kembali ke beranda</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 20px 24px;
}

.success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 12px 0 8px;
  text-align: center;
}

.success-symbol {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 999px;
  background: var(--tint-green);
  color: var(--green);
}

.success p {
  max-width: 338px;
  line-height: 1.45;
}

.receipt {
  padding: 16px;
}

.reference {
  margin-bottom: 3px;
}

.ref-number {
  font-size: 13px;
  font-weight: 600;
}

.copy {
  display: inline-flex;
  padding: 2px;
  border: 0;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
}

.receipt .divider {
  margin: 12px 0;
}

.receipt-item {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.receipt-item:last-of-type {
  margin-bottom: 0;
}

.receipt-thumb {
  flex: none;
  width: 58px;
  height: 66px;
  border-radius: 8px;
}

.item-name {
  font-size: 13px;
  font-weight: 500;
}

.item-price {
  margin-top: 6px;
  font-size: 13px;
  font-weight: 700;
  color: var(--accent);
}

.summary-rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.next-step {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: var(--radius-lg);
  background: var(--tint-green);
  color: var(--green);
}

.next-title {
  font-size: 12px;
  font-weight: 600;
}

.next-step .text-xs {
  color: var(--muted);
  margin-top: 2px;
}

.simulation {
  font-size: 10px;
  color: var(--muted);
  text-align: center;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
}
</style>

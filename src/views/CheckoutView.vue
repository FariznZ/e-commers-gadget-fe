<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import FormField from '@/components/FormField.vue'
import Icon from '@/components/Icon.vue'
import SummaryRow from '@/components/SummaryRow.vue'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { formatIDR } from '@/utils/format'

const router = useRouter()
const cart = useCartStore()
const auth = useAuthStore()

const address = reactive({
  name: auth.user?.name ?? 'Alya Putri',
  phone: auth.user?.phone ?? '0812 3456 7890',
  address: auth.user?.address ?? 'Jl. Kemang Raya No. 12, RT 03/RW 02',
  city: auth.user?.city ?? 'Jakarta Selatan / Mampang Prapatan',
  postalCode: auth.user?.postalCode ?? '12730',
  label: 'Rumah',
})

const store = computed(() => cart.detailed[0]?.product.store ?? 'Nara Official')

function pay() {
  router.push('/pembayaran-berhasil')
}
</script>

<template>
  <div class="screen">
    <AppHeader title="Checkout" back />

    <div class="progress">
      <Icon name="map-pin" :size="17" />
      <span class="step active">Alamat &amp; pesanan</span>
      <Icon name="chevron-right" :size="13" class="muted-icon" />
      <span class="step">Pembayaran</span>
    </div>

    <div class="body">
      <section class="card card-pad">
        <div class="row gap-8 address-head">
          <Icon name="map-pin" :size="19" />
          <h2 class="h2">Alamat pengiriman</h2>
        </div>

        <div class="grid-2">
          <FormField v-model="address.name" label="Nama penerima" placeholder="Nama penerima" />
          <FormField v-model="address.phone" label="Nomor HP" placeholder="Nomor HP" />
        </div>
        <FormField v-model="address.address" label="Alamat lengkap" placeholder="Alamat lengkap" textarea />
        <FormField v-model="address.city" label="Kota / Kecamatan" placeholder="Kota / Kecamatan" />
        <div class="grid-2">
          <FormField v-model="address.postalCode" label="Kode pos" placeholder="Kode pos" />
          <FormField v-model="address.label" label="Label alamat" placeholder="Label alamat" />
        </div>
      </section>

      <section class="card order">
        <div class="store-head">
          <Icon name="store" :size="17" />
          <span class="store-name">{{ store }}</span>
          <Icon name="badge-check" :size="14" class="accent" />
        </div>
        <div class="divider" />

        <div v-for="entry in cart.detailed" :key="`${entry.product.id}-${entry.line.variant}`" class="order-item">
          <div class="thumb order-thumb" :class="`tone-${entry.product.tone}`" />
          <div class="grow">
            <p class="item-name">{{ entry.product.name }}</p>
            <p class="muted text-xs">{{ entry.line.variant }} · {{ entry.line.quantity }} barang</p>
            <p class="item-price">{{ formatIDR(entry.product.price * entry.line.quantity) }}</p>
          </div>
        </div>

        <div class="divider" />
        <div class="delivery">
          <Icon name="truck" :size="20" />
          <div class="grow">
            <p class="delivery-title">Reguler · Gratis ongkir</p>
            <p class="muted text-xs">Estimasi tiba 11–13 Nov</p>
          </div>
          <Icon name="chevron-right" :size="16" class="muted-icon" />
        </div>
      </section>

      <section class="card card-pad">
        <h2 class="h2">Ringkasan pesanan</h2>
        <div class="summary-rows">
          <SummaryRow :label="`Total harga (${cart.selectedCount} barang)`" :value="formatIDR(cart.subtotal)" />
          <SummaryRow label="Voucher HEMAT20" value="−Rp20.000" tone="green" />
          <SummaryRow label="Ongkos kirim" value="Gratis" tone="green" />
          <div class="divider" />
          <SummaryRow label="Total pembayaran" :value="formatIDR(cart.total)" strong tone="accent" />
        </div>
      </section>

      <section class="notice">
        <Icon name="help" :size="16" />
        <p>Pembayaran simulasi. Tidak ada uang yang ditagihkan saat menekan Bayar.</p>
      </section>
    </div>

    <div class="payment-bar">
      <div class="total">
        <span>Total pembayaran</span>
        <strong>{{ formatIDR(cart.total) }}</strong>
      </div>
      <button class="btn btn-primary pay" type="button" @click="pay">Bayar</button>
    </div>
  </div>
</template>

<style scoped>
.progress {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 41px;
  padding: 0 20px;
  background: var(--white);
  color: var(--muted);
}

.progress :deep(svg:first-child) {
  color: var(--accent);
}

.step {
  font-size: 11px;
  font-weight: 400;
}

.step.active {
  font-weight: 600;
  color: var(--accent);
}

.muted-icon {
  color: var(--muted);
}

.body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 20px 20px;
}

.card-pad {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.gap-8 {
  gap: 8px;
}

.address-head :deep(svg) {
  color: var(--accent);
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.order {
  overflow: hidden;
}

.store-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
}

.store-name {
  font-size: 13px;
  font-weight: 600;
}

.order-item {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
}

.order-thumb {
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

.delivery {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 14px 16px;
}

.delivery :deep(svg:first-child) {
  color: var(--accent);
}

.delivery-title {
  font-size: 12px;
  font-weight: 600;
}

.summary-rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.notice {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px 12px;
  border-radius: var(--radius-lg);
  background: var(--tint-accent);
  color: var(--accent);
  font-size: 11px;
  line-height: 1.4;
}

.payment-bar {
  position: sticky;
  bottom: 0;
  z-index: 25;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px calc(12px + env(safe-area-inset-bottom));
  background: var(--white);
  border-top: 1px solid var(--line);
  box-shadow: var(--shadow-bar);
}

.total {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.total span {
  font-size: 11px;
  color: var(--muted);
}

.total strong {
  font-size: 20px;
  font-weight: 700;
  color: var(--accent);
}

.pay {
  min-width: 166px;
}
</style>

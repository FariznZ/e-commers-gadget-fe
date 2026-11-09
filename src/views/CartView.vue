<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import Icon from '@/components/Icon.vue'
import QtyStepper from '@/components/QtyStepper.vue'
import SummaryRow from '@/components/SummaryRow.vue'
import { useCartStore } from '@/stores/cart'
import { formatIDR, signedIDR } from '@/utils/format'

const cart = useCartStore()
const router = useRouter()

const store = computed(() => cart.detailed[0]?.product.store ?? 'Nara Official')
const totalItems = computed(() => cart.lineCount)

function goCheckout() {
  if (cart.selectedCount > 0) router.push('/checkout')
}
</script>

<template>
  <div class="screen">
    <AppHeader :title="`Keranjang (${cart.lineCount})`" back>
      <template #action>
        <button class="icon-btn" type="button" aria-label="Opsi keranjang">
          <Icon name="ellipsis" :size="22" />
        </button>
      </template>
    </AppHeader>

    <div class="promo">
      <Icon name="truck" :size="20" />
      <p>Yeay! Pesananmu dapat gratis ongkir.</p>
    </div>

    <div v-if="cart.detailed.length" class="body">
      <div class="row between select-row">
        <button class="row gap-8 select-all" type="button" @click="cart.toggleAll()">
          <span class="check" :class="{ active: cart.allSelected }">
            <Icon v-if="cart.allSelected" name="check" :size="12" :stroke-width="2.4" />
          </span>
          <span>Pilih semua ({{ totalItems }})</span>
        </button>
        <button class="remove" type="button" :disabled="cart.selectedCount === 0" @click="cart.removeSelected()">
          Hapus
        </button>
      </div>

      <section class="card store-card">
        <div class="store-head">
          <button class="check" :class="{ active: cart.allSelected }" type="button" aria-label="Pilih semua item toko" @click="cart.toggleAll()">
            <Icon v-if="cart.allSelected" name="check" :size="12" :stroke-width="2.4" />
          </button>
          <Icon name="store" :size="17" />
          <span class="store-name">{{ store }}</span>
          <Icon name="badge-check" :size="14" class="store-badge" />
          <Icon name="chevron-right" :size="14" class="muted-icon" />
        </div>
        <div class="divider" />

        <div v-for="entry in cart.detailed" :key="`${entry.product.id}-${entry.line.variant}`" class="cart-item">
          <button
            class="check item-check"
            :class="{ active: entry.line.selected }"
            type="button"
            :aria-label="`Pilih ${entry.product.name}`"
            @click="cart.toggle(entry.product.id, entry.line.variant)"
          >
            <Icon v-if="entry.line.selected" name="check" :size="12" :stroke-width="2.4" />
          </button>

          <div class="thumb item-thumb" :class="`tone-${entry.product.tone}`" />

          <div class="item-info">
            <p class="item-name">{{ entry.product.name }}</p>
            <button class="variant" type="button">
              <span>{{ entry.line.variant }}</span>
              <Icon name="chevron-down" :size="11" />
            </button>
            <p class="original">{{ formatIDR(entry.product.originalPrice) }}</p>
            <div class="row between price-row">
              <span class="item-price">{{ formatIDR(entry.product.price) }}</span>
              <QtyStepper
                :model-value="entry.line.quantity"
                @update:model-value="cart.setQuantity(entry.product.id, entry.line.variant, $event)"
              />
            </div>
          </div>
        </div>

        <div class="store-ship">
          <Icon name="truck" :size="16" />
          <span>Gratis ongkir hingga Rp20.000</span>
        </div>
      </section>

      <section class="card voucher">
        <Icon name="ticket" :size="22" class="voucher-icon" />
        <div class="grow">
          <p class="voucher-title">Voucher belanja</p>
          <p class="voucher-sub">HEMAT20 dipakai · Hemat Rp20.000</p>
        </div>
        <Icon name="chevron-right" :size="17" class="muted-icon" />
      </section>

      <section class="card card-pad summary">
        <h2 class="h2">Ringkasan belanja</h2>
        <div class="summary-rows">
          <SummaryRow :label="`Total harga (${cart.selectedCount} barang)`" :value="formatIDR(cart.subtotal)" />
          <SummaryRow label="Diskon voucher" :value="signedIDR(-cart.discount)" tone="green" />
          <SummaryRow label="Ongkos kirim" value="Gratis" tone="green" />
          <div class="divider" />
          <SummaryRow label="Total pembayaran" :value="formatIDR(cart.total)" strong tone="accent" />
        </div>
        <div class="savings">
          <Icon name="star" :size="15" />
          <span>Kamu hemat {{ formatIDR(cart.savings) }} hari ini!</span>
        </div>
      </section>

      <p class="protection">
        <Icon name="shield" :size="15" />
        Belanja aman · Pembayaran terlindungi rama
      </p>
    </div>

    <div v-else class="empty">
      <Icon name="cart" :size="28" />
      <p>Keranjangmu masih kosong.</p>
      <RouterLink to="/jelajah" class="btn btn-primary">Mulai belanja</RouterLink>
    </div>

    <div v-if="cart.detailed.length" class="checkout-bar">
      <div class="total">
        <span>Total pembayaran</span>
        <strong>{{ formatIDR(cart.total) }}</strong>
      </div>
      <button class="btn btn-primary" type="button" :disabled="cart.selectedCount === 0" @click="goCheckout">
        Checkout ({{ cart.selectedCount }})
      </button>
    </div>
  </div>
</template>

<style scoped>
.promo {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 46px;
  padding: 0 20px;
  background: var(--white);
  color: var(--accent);
  font-size: 12px;
  font-weight: 500;
}

.body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 20px 20px;
}

.gap-8 {
  gap: 8px;
}

.select-row {
  padding: 0 2px;
}

.select-all {
  border: 0;
  background: transparent;
  padding: 0;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}

.check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 20px;
  height: 20px;
  padding: 0;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
  color: var(--white);
  cursor: pointer;
}

.check.active {
  border-color: var(--accent);
  background: var(--accent);
}

.remove {
  border: 0;
  background: transparent;
  padding: 0;
  font-size: 12px;
  color: var(--muted);
  cursor: pointer;
}

.remove:disabled {
  opacity: 0.4;
}

.store-card {
  overflow: hidden;
}

.store-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px;
}

.store-name {
  font-size: 13px;
  font-weight: 600;
}

.store-badge {
  color: var(--accent);
}

.muted-icon {
  color: var(--muted);
  margin-left: auto;
}

.cart-item {
  display: flex;
  gap: 12px;
  padding: 14px;
}

.item-check {
  margin-top: 38px;
}

.item-thumb {
  flex: none;
  width: 82px;
  height: 96px;
  border-radius: 8px;
}

.item-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-name {
  font-size: 13px;
  font-weight: 500;
}

.variant {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 6px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--white);
  font-size: 10px;
  color: var(--muted);
  cursor: pointer;
}

.original {
  font-size: 10px;
  color: var(--muted);
  text-decoration: line-through;
}

.price-row {
  margin-top: 2px;
}

.item-price {
  font-size: 14px;
  font-weight: 700;
  color: var(--accent);
}

.store-ship {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 14px;
  background: var(--tint-green);
  color: var(--green);
  font-size: 10px;
}

.voucher {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
}

.voucher-icon {
  color: var(--accent);
}

.voucher-title {
  font-size: 13px;
  font-weight: 600;
}

.voucher-sub {
  margin-top: 2px;
  font-size: 11px;
  color: var(--green);
}

.summary-rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
}

.savings {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 12px;
  padding: 8px 10px;
  border-radius: var(--radius-md);
  background: var(--tint-accent);
  color: var(--accent);
  font-size: 11px;
  font-weight: 500;
}

.protection {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 10px;
  color: var(--muted);
}

.checkout-bar {
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

.checkout-bar .btn {
  min-width: 166px;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px 20px;
  color: var(--muted);
  font-size: 13px;
}

.empty .btn {
  height: 42px;
  padding: 0 20px;
  font-size: 13px;
}
</style>

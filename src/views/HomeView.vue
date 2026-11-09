<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '@/components/Icon.vue'
import ProductCard from '@/components/ProductCard.vue'
import { products } from '@/data/products'

const router = useRouter()
const keyword = ref('')

const categories = ['Elektronik', 'Fashion', 'Kecantikan', 'Rumah', 'Lainnya']

function search() {
  router.push({ path: '/jelajah', query: keyword.value ? { q: keyword.value } : {} })
}
</script>

<template>
  <div class="screen">
    <div class="home-top">
      <div class="row between">
        <span class="brand">rama</span>
        <button class="icon-btn" type="button" aria-label="Notifikasi">
          <Icon name="bell" :size="22" />
        </button>
      </div>

      <form class="search-bar" @submit.prevent="search">
        <Icon name="search" :size="19" />
        <input v-model="keyword" type="search" placeholder="Cari barang favoritmu di sini" />
      </form>

      <button class="delivery" type="button">
        <Icon name="map-pin" :size="14" />
        <span class="delivery-label">Kirim ke</span>
        <strong>Jakarta Selatan</strong>
        <Icon name="chevron-down" :size="13" />
      </button>
    </div>

    <div class="stack body">
      <section class="section">
        <div class="card campaign">
          <p class="eyebrow">FAVORIT HARIAN</p>
          <h2 class="h2">Suara jernih,<br />harga lebih asyik.</h2>
          <p class="campaign-price">Nara Buds Lite mulai Rp249.000</p>
          <RouterLink to="/produk/nara-buds-lite" class="btn btn-soft campaign-cta">
            Belanja sekarang
          </RouterLink>
        </div>
      </section>

      <section class="section benefits">
        <div class="card benefit">
          <Icon name="truck" :size="17" />
          <span>Gratis ongkir</span>
        </div>
        <div class="card benefit">
          <Icon name="ticket" :size="17" />
          <span>Voucher buatmu</span>
        </div>
      </section>

      <section class="section">
        <div class="row between section-head">
          <h2 class="h2">Mau cari apa?</h2>
          <RouterLink to="/jelajah" class="link">Lihat semua</RouterLink>
        </div>
        <div class="chip-row">
          <button v-for="c in categories" :key="c" class="chip" type="button" @click="router.push(`/jelajah?kategori=${encodeURIComponent(c)}`)">
            {{ c }}
          </button>
        </div>
      </section>

      <section class="section">
        <div class="row between section-head">
          <h2 class="h2">Pilihan buat kamu</h2>
          <RouterLink to="/jelajah" class="link">Lihat semua</RouterLink>
        </div>
        <div class="grid">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.home-top {
  padding: 14px 20px 14px;
  background: var(--white);
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  margin-top: 14px;
  padding: 0 13px;
  border-radius: var(--radius-lg);
  background: var(--bg);
  color: var(--muted);
}

.search-bar input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  font-size: 13px;
  color: var(--ink);
}

.search-bar input::placeholder {
  color: var(--muted);
}

.delivery {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  padding: 0;
  border: 0;
  background: transparent;
  font-size: 11px;
  color: var(--muted);
  cursor: pointer;
}

.delivery :deep(svg) {
  color: var(--accent);
}

.delivery-label {
  color: var(--muted);
}

.delivery strong {
  font-weight: 600;
  color: var(--ink);
}

.body {
  gap: 18px;
  padding: 16px 0 24px;
}

.section {
  padding: 0 20px;
}

.campaign {
  padding: 16px;
  background:
    radial-gradient(120% 120% at 100% 0%, #ffe0cd 0%, transparent 60%),
    var(--tint-accent);
}

.eyebrow {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--accent);
}

.campaign h2 {
  margin-top: 6px;
}

.campaign-price {
  margin-top: 6px;
  font-size: 13px;
  color: var(--muted);
}

.campaign-cta {
  height: 34px;
  margin-top: 12px;
  padding: 0 14px;
  border-radius: var(--radius-md);
  background: var(--white);
  font-size: 11px;
}

.benefits {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.benefit {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 12px;
  font-size: 11px;
  font-weight: 600;
}

.benefit :deep(svg) {
  color: var(--accent);
}

.section-head {
  margin-bottom: 10px;
}

.link {
  font-size: 11px;
  font-weight: 500;
  color: var(--accent);
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
</style>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import Icon from '@/components/Icon.vue'
import { getProduct } from '@/data/products'
import { supabase } from '@/lib/supabase'
import { useCartStore } from '@/stores/cart'
import { formatIDR } from '@/utils/format'
import type { Product } from '@/types'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()

const product = ref<Product | null>(null)
const isLoading = ref(true)
const variant = ref('')
const added = ref(false)

async function loadProduct() {
  const id = String(route.params.id)
  isLoading.value = true

  // Cek dulu apakah ada di mock data
  const localProduct = getProduct(id)
  if (localProduct) {
    product.value = localProduct
    variant.value = localProduct.variants?.[0] ?? 'Standar'
    isLoading.value = false
    return
  }

  // Jika tidak ada di mock, ambil langsung dari Supabase
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (error) throw error

    if (data) {
      product.value = data
      variant.value = data.variants?.[0] ?? 'Standar'
    } else {
      product.value = null
    }
  } catch (error) {
    console.error('Error fetching product from Supabase:', error)
    product.value = null
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadProduct()
})

const discountPercent = computed(() => {
  if (!product.value) return ''
  if (product.value.discountLabel) {
    return `Hemat ${product.value.discountLabel.replace(/[^0-9]/g, '')}%`
  }
  if (product.value.originalPrice && product.value.originalPrice > product.value.price) {
    const pct = Math.round(
      ((product.value.originalPrice - product.value.price) / product.value.originalPrice) * 100,
    )
    return `Hemat ${pct}%`
  }
  return ''
})

function addToCart() {
  if (!product.value) return
  cart.add(product.value, variant.value)
  added.value = true
  window.setTimeout(() => (added.value = false), 1600)
}

function buyNow() {
  if (!product.value) return
  cart.add(product.value, variant.value)
  router.push('/checkout')
}
</script>

<template>
  <div class="screen">
    <AppHeader title="Detail produk" back>
      <template #action>
        <RouterLink to="/keranjang" class="icon-btn" aria-label="Keranjang">
          <Icon name="cart" :size="22" />
        </RouterLink>
      </template>
    </AppHeader>

    <div v-if="isLoading" class="not-found">
      <Icon name="package" :size="26" />
      <p>Memuat detail produk...</p>
    </div>

    <template v-else-if="product">
      <div class="scroll detail">
        <div class="thumb gallery" :class="product.tone ? `tone-${product.tone}` : ''">
          <img
            v-if="product.image_url"
            :src="product.image_url"
            :alt="product.name"
            class="detail-image"
          />
          <span class="count-pill">1 / 1</span>
        </div>

        <section class="block">
          <div class="price-row">
            <span class="price">{{ formatIDR(product.price) }}</span>
            <span v-if="product.originalPrice" class="original">
              {{ formatIDR(product.originalPrice) }}
            </span>
            <span v-if="discountPercent" class="pill pill-accent">{{ discountPercent }}</span>
          </div>

          <h1 class="name">{{ product.subtitle ?? product.name }}</h1>

          <div class="rating">
            <Icon name="star" :size="13" />
            <strong>{{ product.rating ? product.rating.toLocaleString('id-ID') : '5.0' }}</strong>
            <span class="muted">
              {{ product.sold ? `· ${product.sold}` : `· Stok tersedia: ${product.stock}` }}
            </span>
          </div>
        </section>

        <div class="divider" />

        <section class="block">
          <div v-if="product.variants && product.variants.length > 0">
            <p class="field-label">Pilihan: {{ variant }}</p>
            <div class="chip-row">
              <button
                v-for="option in product.variants"
                :key="option"
                class="chip"
                :class="{ active: variant === option }"
                type="button"
                @click="variant = option"
              >
                {{ option }}
              </button>
            </div>
            <p class="muted text-xs stock">Stok tersedia: {{ product.stock }}</p>
          </div>
          <div v-else>
            <p class="muted text-xs stock">
              Kategori: <strong>{{ product.category }}</strong> · Stok: <strong>{{ product.stock }}</strong>
            </p>
          </div>

          <div v-if="product.features && product.features.length" class="chip-row features">
            <span v-for="feature in product.features" :key="feature" class="feature">
              {{ feature }}
            </span>
          </div>
        </section>

        <section class="block">
          <div class="card shipping">
            <div class="row gap-8">
              <Icon name="truck" :size="18" />
              <strong>Gratis ongkir</strong>
            </div>
            <p class="muted text-xs">Ke Jakarta Selatan · Tiba 2–3 hari kerja</p>
            <p class="muted text-2xs">Min. belanja Rp100.000</p>
          </div>
        </section>

        <section class="block">
          <div class="card seller">
            <div class="monogram">{{ (product.store ?? 'OOLAMA')[0] }}</div>
            <div class="grow">
              <p class="row gap-4 seller-name">
                {{ product.store ?? 'OOLAMA Official' }}
                <Icon name="badge-check" :size="13" />
              </p>
              <p class="muted text-xs">{{ product.storeLocation ?? 'Jakarta Selatan · Online' }}</p>
            </div>
            <button class="link" type="button">Kunjungi</button>
          </div>
        </section>

        <section class="block">
          <h2 class="h2">Deskripsi Produk</h2>
          <p class="desc">{{ product.description }}</p>
        </section>
      </div>

      <div class="sticky-actions">
        <button class="btn btn-outline chat" type="button">
          <Icon name="message" :size="18" />
          <span>Chat</span>
        </button>
        <button class="btn btn-soft grow" type="button" @click="addToCart">
          {{ added ? 'Ditambahkan' : '+ Keranjang' }}
        </button>
        <button class="btn btn-primary grow" type="button" @click="buyNow">Beli sekarang</button>
      </div>
    </template>

    <div v-else class="not-found">
      <p>Produk tidak ditemukan.</p>
      <RouterLink to="/jelajah" class="btn btn-primary">Kembali ke jelajah</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.detail {
  padding-bottom: 16px;
}

.gallery {
  aspect-ratio: 1 / 1;
  width: 100%;
  position: relative;
  background: #f1f2f5;
  overflow: hidden;
}

.detail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.count-pill {
  position: absolute;
  right: 14px;
  bottom: 14px;
  z-index: 1;
  padding: 5px 9px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 11px;
  font-weight: 500;
}

.block {
  padding: 16px 20px;
}

.price-row {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
}

.price {
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--accent);
}

.original {
  font-size: 12px;
  color: var(--muted);
  text-decoration: line-through;
}

.name {
  margin-top: 10px;
  font-size: 19px;
  font-weight: 700;
  line-height: 1.3;
  white-space: pre-line;
}

.rating {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  font-size: 12px;
}

.rating :deep(svg) {
  color: var(--accent-strong);
}

.rating strong {
  font-weight: 600;
}

.stock {
  margin-top: 8px;
}

.features {
  margin-top: 14px;
}

.feature {
  padding: 6px 9px;
  border-radius: 999px;
  background: var(--bg);
  font-size: 10px;
  color: var(--muted);
  white-space: nowrap;
}

.shipping {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 12px 14px;
  background: var(--tint-green);
}

.shipping :deep(svg),
.shipping strong {
  color: var(--green);
}

.shipping strong {
  font-size: 13px;
}

.gap-8 {
  gap: 8px;
}

.gap-4 {
  gap: 4px;
}

.seller {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
}

.monogram {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: var(--tint-accent);
  color: var(--accent-strong);
  font-size: 20px;
  font-weight: 700;
}

.seller-name {
  font-size: 13px;
  font-weight: 600;
}

.seller-name :deep(svg) {
  color: var(--accent);
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

.desc {
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.55;
  color: var(--muted);
}

.chat {
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  width: 58px;
  height: 48px;
  padding: 0;
  font-size: 9px;
  font-weight: 400;
  color: var(--muted);
  border-color: var(--line);
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 40px 20px;
  font-size: 13px;
  color: var(--muted);
}
</style>
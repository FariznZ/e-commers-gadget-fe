<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import Icon from '@/components/Icon.vue'
import ProductCard from '@/components/ProductCard.vue'
import { products as localGadgets } from '@/data/products'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types'

const route = useRoute()

const keyword = ref(typeof route.query.q === 'string' ? route.query.q : '')
const activeCategory = ref(
  typeof route.query.kategori === 'string' ? route.query.kategori : 'Semua',
)

// Kategori khusus Gadget & Elektronik
const categories = ['Semua', 'Smartphone', 'Laptop', 'Audio', 'Wearable', 'Aksesoris']
const sorts = ['Paling sesuai', 'Harga terendah', 'Harga tertinggi'] as const
const sortIndex = ref(0)

const products = ref<Product[]>([])
const isLoading = ref(true)
const errorMessage = ref('')

async function fetchProducts() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    // Hanya ambil produk yang berkategori 'Elektronik' dari Supabase
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', 'Elektronik')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Gabungkan produk gadget Supabase dengan produk gadget lokal
    const dbGadgets = data || []
    const combined = [...dbGadgets]

    // Tambahkan gadget lokal jika belum ada di list
    for (const local of localGadgets) {
      if (!combined.some((item) => item.id === local.id)) {
        combined.push(local)
      }
    }

    products.value = combined
  } catch (error: any) {
    console.warn('Error fetching electronics, fallback to local gadgets:', error)
    products.value = [...localGadgets]
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})

function matchesGadgetCategory(product: Product, cat: string): boolean {
  if (cat === 'Semua' || cat === 'Elektronik') return true
  const text = `${product.name} ${product.description} ${product.category}`.toLowerCase()

  if (cat === 'Smartphone') {
    return (
      text.includes('iphone') ||
      text.includes('galaxy') ||
      text.includes('smartphone') ||
      text.includes('phone')
    )
  }
  if (cat === 'Laptop') {
    return (
      text.includes('macbook') ||
      text.includes('laptop') ||
      text.includes('notebook')
    )
  }
  if (cat === 'Audio') {
    return (
      text.includes('headphone') ||
      text.includes('earbud') ||
      text.includes('buds') ||
      text.includes('audio') ||
      text.includes('tws') ||
      text.includes('wh-1000') ||
      text.includes('speaker')
    )
  }
  if (cat === 'Wearable') {
    return (
      text.includes('watch') ||
      text.includes('smartwatch') ||
      text.includes('band') ||
      text.includes('wearable')
    )
  }
  if (cat === 'Aksesoris') {
    return (
      text.includes('charger') ||
      text.includes('powerbank') ||
      text.includes('gan') ||
      text.includes('kabel') ||
      text.includes('case') ||
      text.includes('adapter')
    )
  }
  return false
}

const filtered = computed(() => {
  const term = keyword.value.trim().toLowerCase()
  const result = products.value.filter((product) => {
    const matchCategory = matchesGadgetCategory(product, activeCategory.value)
    const matchTerm =
      !term ||
      product.name?.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term) ||
      product.category?.toLowerCase().includes(term)
    return matchCategory && matchTerm
  })
  if (sorts[sortIndex.value] === 'Harga terendah') return [...result].sort((a, b) => a.price - b.price)
  if (sorts[sortIndex.value] === 'Harga tertinggi') return [...result].sort((a, b) => b.price - a.price)
  return result
})

function cycleSort() {
  sortIndex.value = (sortIndex.value + 1) % sorts.length
}
</script>

<template>
  <div class="screen">
    <AppHeader title="Katalog Gadget" back>
      <template #action>
        <RouterLink to="/keranjang" class="icon-btn" aria-label="Keranjang">
          <Icon name="cart" :size="22" />
        </RouterLink>
      </template>
    </AppHeader>

    <div class="search-wrap">
      <div class="search-bar">
        <Icon name="search" :size="19" />
        <input v-model="keyword" type="search" placeholder="Cari gadget, smartphone, laptop..." />
      </div>
      <div class="chip-row categories">
        <button
          v-for="c in categories"
          :key="c"
          class="chip"
          :class="{ active: activeCategory === c }"
          type="button"
          @click="activeCategory = c"
        >
          {{ c }}
        </button>
      </div>
    </div>

    <div class="results-head">
      <p class="count">{{ filtered.length }} gadget pilihan</p>
      <button class="sort" type="button" @click="cycleSort">
        <Icon name="sliders" :size="14" />
        <span>{{ sorts[sortIndex] }}</span>
        <Icon name="chevron-down" :size="13" />
      </button>
    </div>

    <div class="content">
      <!-- Loading State -->
      <div v-if="isLoading" class="empty card">
        <Icon name="package" :size="24" />
        <p>Memuat koleksi gadget...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="errorMessage" class="empty card">
        <Icon name="help" :size="24" />
        <p>{{ errorMessage }}</p>
        <button class="btn btn-primary" type="button" @click="fetchProducts">
          Coba Lagi
        </button>
      </div>

      <!-- Grid Data -->
      <div v-else-if="filtered.length" class="grid">
        <ProductCard v-for="product in filtered" :key="product.id" :product="product" />
      </div>

      <!-- Empty State -->
      <div v-else class="empty card">
        <Icon name="search" :size="22" />
        <p>Tidak ada gadget yang cocok dengan filter.</p>
        <button class="btn btn-soft" type="button" @click="keyword = ''; activeCategory = 'Semua'">
          Reset filter
        </button>
      </div>

      <p class="reassurance">
        <Icon name="shield" :size="14" />
        100% Gadget Original &amp; Bergaransi Resmi.
      </p>
    </div>
  </div>
</template>

<style scoped>
.search-wrap {
  padding: 0 20px 14px;
  background: var(--white);
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 44px;
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

.categories {
  margin-top: 14px;
}

.results-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 10px;
}

.count {
  font-size: 13px;
  font-weight: 600;
}

.sort {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 0;
  border: 0;
  background: transparent;
  font-size: 11px;
  color: var(--muted);
  cursor: pointer;
}

.content {
  padding: 0 20px 24px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 28px 20px;
  text-align: center;
  color: var(--muted);
  font-size: 12px;
}

.empty .btn {
  height: 38px;
  font-size: 12px;
}

.reassurance {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 18px;
  font-size: 10px;
  color: var(--muted);
}
</style>
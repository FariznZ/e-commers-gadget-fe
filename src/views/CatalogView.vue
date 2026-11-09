<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import Icon from '@/components/Icon.vue'
import ProductCard from '@/components/ProductCard.vue'
import { products } from '@/data/products'

const route = useRoute()

const keyword = ref(typeof route.query.q === 'string' ? route.query.q : '')
const activeCategory = ref(
  typeof route.query.kategori === 'string' ? route.query.kategori : 'Semua',
)

const categories = ['Semua', 'Elektronik', 'Fashion', 'Kecantikan', 'Rumah', 'Lainnya']
const sorts = ['Paling sesuai', 'Harga terendah', 'Harga tertinggi'] as const
const sortIndex = ref(0)

const filtered = computed(() => {
  const term = keyword.value.trim().toLowerCase()
  const result = products.filter((product) => {
    const matchCategory = activeCategory.value === 'Semua' || product.category === activeCategory.value
    const matchTerm =
      !term ||
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.store.toLowerCase().includes(term)
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
    <AppHeader title="Jelajah produk" back>
      <template #action>
        <RouterLink to="/keranjang" class="icon-btn" aria-label="Keranjang">
          <Icon name="cart" :size="22" />
        </RouterLink>
      </template>
    </AppHeader>

    <div class="search-wrap">
      <div class="search-bar">
        <Icon name="search" :size="19" />
        <input v-model="keyword" type="search" placeholder="Cari barang favoritmu di sini" />
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
      <p class="count">{{ filtered.length }} produk untukmu</p>
      <button class="sort" type="button" @click="cycleSort">
        <Icon name="sliders" :size="14" />
        <span>{{ sorts[sortIndex] }}</span>
        <Icon name="chevron-down" :size="13" />
      </button>
    </div>

    <div class="content">
      <div v-if="filtered.length" class="grid">
        <ProductCard v-for="product in filtered" :key="product.id" :product="product" />
      </div>
      <div v-else class="empty card">
        <Icon name="search" :size="22" />
        <p>Belum ada produk yang cocok.</p>
        <button class="btn btn-soft" type="button" @click="keyword = ''; activeCategory = 'Semua'">
          Reset pencarian
        </button>
      </div>

      <p class="reassurance">
        <Icon name="shield" :size="14" />
        Pilihan berkualitas, harga bersahabat.
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

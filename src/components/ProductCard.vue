<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import { formatIDR } from '@/utils/format'
import type { Product } from '@/types'

defineProps<{ product: Product }>()
</script>

<template>
  <RouterLink :to="`/produk/${product.id}`" class="card product-card">
    <div class="thumb media" :class="`tone-${product.tone}`">
      <span class="discount">{{ product.discountLabel.replace('-', '−') }}</span>
    </div>
    <div class="info">
      <p class="name line-clamp-2">{{ product.name }}</p>
      <p class="price">{{ formatIDR(product.price) }}</p>
      <p class="original">{{ formatIDR(product.originalPrice) }}</p>
      <p class="rating">
        <Icon name="star" :size="11" />
        <span>{{ product.rating.toLocaleString('id-ID') }} · {{ product.sold }}</span>
      </p>
    </div>
  </RouterLink>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.media {
  aspect-ratio: 175 / 168;
  width: 100%;
}

.discount {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 1;
  padding: 4px 6px;
  border-radius: var(--radius-sm);
  background: var(--white);
  color: var(--accent);
  font-size: 10px;
  font-weight: 600;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 10px;
}

.name {
  font-size: 13px;
  font-weight: 500;
  line-height: 1.25;
  min-height: 32px;
}

.price {
  margin-top: 2px;
  font-size: 16px;
  font-weight: 700;
  color: var(--accent);
}

.original {
  font-size: 10px;
  color: var(--muted);
  text-decoration: line-through;
}

.rating {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 2px;
  font-size: 10px;
  color: var(--muted);
}

.rating :deep(svg) {
  color: var(--accent-strong);
}
</style>

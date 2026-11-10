<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import { formatIDR } from '@/utils/format'
import type { Product } from '@/types'

defineProps<{ product: Product }>()
</script>

<template>
  <RouterLink :to="`/produk/${product.id}`" class="card product-card">
    <div class="thumb media" :class="product.tone ? `tone-${product.tone}` : ''">
      <img
        v-if="product.image_url"
        :src="product.image_url"
        :alt="product.name"
        class="product-image"
        loading="lazy"
      />
      <span v-if="product.discountLabel" class="discount">
        {{ product.discountLabel.replace('-', '−') }}
      </span>
    </div>

    <div class="info">
      <p class="name line-clamp-2">{{ product.name }}</p>
      <p class="price">{{ formatIDR(product.price) }}</p>
      <p v-if="product.originalPrice" class="original">{{ formatIDR(product.originalPrice) }}</p>

      <p class="meta">
        <Icon name="star" :size="11" />
        <span>{{ product.category }} · Stok {{ product.stock }}</span>
      </p>
    </div>
  </RouterLink>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  transition: transform 0.15s ease;
}

.product-card:active {
  transform: scale(0.98);
}

.media {
  aspect-ratio: 175 / 168;
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #f1f2f5;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
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
  color: var(--ink);
}

.price {
  margin-top: 2px;
  font-size: 15px;
  font-weight: 700;
  color: var(--accent);
}

.original {
  font-size: 10px;
  color: var(--muted);
  text-decoration: line-through;
}

.meta {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 2px;
  font-size: 10px;
  color: var(--muted);
}

.meta :deep(svg) {
  color: var(--accent-strong);
}
</style>
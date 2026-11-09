<script setup lang="ts">
import { useRouter } from 'vue-router'
import Icon from '@/components/Icon.vue'

withDefaults(defineProps<{ title?: string; back?: boolean }>(), { title: '', back: false })

const router = useRouter()

function goBack() {
  if (window.history.length > 1) router.back()
  else router.push('/')
}
</script>

<template>
  <header class="app-header">
    <button v-if="back" class="icon-btn" type="button" aria-label="Kembali" @click="goBack">
      <Icon name="arrow-left" :size="22" />
    </button>
    <h1 class="title">{{ title }}</h1>
    <div class="actions">
      <slot name="action" />
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 16px;
  height: 58px;
  padding: 0 20px;
  background: var(--white);
}

.title {
  flex: 1;
  min-width: 0;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.actions {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>

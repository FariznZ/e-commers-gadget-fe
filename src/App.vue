<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BottomNav from '@/components/BottomNav.vue'

const route = useRoute()
const main = ref<HTMLElement | null>(null)

watch(
  () => route.fullPath,
  () => {
    if (main.value) main.value.scrollTop = 0
  },
)
</script>

<template>
  <div class="app-frame">
    <main ref="main" class="app-main">
      <RouterView />
    </main>
    <BottomNav v-if="!route.meta.hideNav" />
  </div>
</template>

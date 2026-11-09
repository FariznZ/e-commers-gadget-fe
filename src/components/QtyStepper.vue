<script setup lang="ts">
import Icon from '@/components/Icon.vue'

const props = withDefaults(defineProps<{ modelValue: number; min?: number }>(), { min: 1 })
const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

function change(delta: number) {
  emit('update:modelValue', Math.max(props.min, props.modelValue + delta))
}
</script>

<template>
  <div class="stepper">
    <button type="button" aria-label="Kurangi jumlah" @click="change(-1)">
      <Icon name="minus" :size="12" :stroke-width="2" />
    </button>
    <span class="qty">{{ modelValue }}</span>
    <button type="button" aria-label="Tambah jumlah" @click="change(1)">
      <Icon name="plus" :size="12" :stroke-width="2" />
    </button>
  </div>
</template>

<style scoped>
.stepper {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 25px;
  padding: 0 4px;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--white);
}

button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
}

button:disabled {
  opacity: 0.4;
}

.qty {
  min-width: 12px;
  font-size: 11px;
  font-weight: 500;
  text-align: center;
}
</style>

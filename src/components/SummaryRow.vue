<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    value: string
    tone?: 'default' | 'muted' | 'green' | 'accent'
    strong?: boolean
  }>(),
  { tone: 'default', strong: false },
)
</script>

<template>
  <div class="summary-row">
    <span class="label" :class="{ strong }">{{ label }}</span>
    <span class="value" :class="[tone, { strong }]">{{ value }}</span>
  </div>
</template>

<style scoped>
.summary-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
}

.label {
  font-size: 12px;
  color: var(--muted);
}

.label.strong {
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
}

.value {
  font-size: 12px;
  font-weight: 500;
  color: var(--ink);
  text-align: right;
  white-space: nowrap;
}

.value.strong {
  font-size: 18px;
  font-weight: 700;
}

.value.muted {
  color: var(--muted);
  font-weight: 400;
}

.value.green {
  color: var(--green);
}

.value.accent {
  color: var(--accent);
}
</style>

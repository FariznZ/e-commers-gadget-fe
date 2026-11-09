<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ name: string; size?: number; strokeWidth?: number }>(),
  { size: 20, strokeWidth: 1.7 },
)

const icons: Record<string, string> = {
  'arrow-left': '<path d="m15 18-6-6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  home: '<path d="M3 10.75 12 3l9 7.75"/><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3.5h2l2.2 11.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6l1.2-7.2H6"/>',
  user: '<circle cx="12" cy="8" r="3.6"/><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.4-3.4"/>',
  truck:
    '<path d="M2.5 6.5h11v9h-11z"/><path d="M13.5 9.5h4l3 3.5v2.5h-7z"/><circle cx="6" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/>',
  package: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5"/><path d="M12 12v9"/>',
  'map-pin':
    '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
  'credit-card': '<rect x="2.5" y="5.5" width="19" height="13" rx="2.5"/><path d="M2.5 10h19"/>',
  ticket:
    '<path d="M3.5 9.5V7a1.5 1.5 0 0 1 1.5-1.5h14A1.5 1.5 0 0 1 20.5 7v2.5a2.5 2.5 0 0 0 0 5V17a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17v-2.5a2.5 2.5 0 0 0 0-5z"/><path d="M9.5 9.5h.01M9.5 14.5h.01M14.5 9.5 9.5 14.5"/>',
  shield:
    '<path d="M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6z"/><path d="m9 12 2 2 4-4"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.2a2.5 2.5 0 1 1 3.6 2.3c-.8.4-1.2.9-1.2 1.8"/><path d="M12 17h.01"/>',
  message:
    '<path d="M20.5 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4.6A8 8 0 1 1 20.5 11.5z"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2 4.8-5"/>',
  star: '<path d="m12 3.6 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.8l5.9-.9z" fill="currentColor" stroke="none"/>',
  store:
    '<path d="M4 9.5 5.5 4h13L20 9.5"/><path d="M4 9.5h16v2.2a2.4 2.4 0 0 1-4.8 0 2.6 2.6 0 0 1-5.2 0 2.6 2.6 0 0 1-5.2 0z"/><path d="M5.5 13v7h13v-7"/><path d="M10 20v-4.5h4V20"/>',
  'badge-check':
    '<path d="m12 2.8 2.2 1.6 2.7-.2 1 2.5 2.2 1.6-.9 2.6.9 2.6-2.2 1.6-1 2.5-2.7-.2L12 20.8l-2.2-1.6-2.7.2-1-2.5L3.9 15l.9-2.6-.9-2.6 2.2-1.6 1-2.5 2.7.2z"/><path d="m9 12 2 2 4-4"/>',
  sliders:
    '<path d="M4 7h16M4 12h16M4 17h16"/><circle cx="9" cy="7" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="8" cy="17" r="2"/>',
  ellipsis:
    '<circle cx="5" cy="12" r="1.7" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.7" fill="currentColor" stroke="none"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5.5 15H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v.5"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2.2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  bell: '<path d="M18 9a6 6 0 1 0-12 0c0 4-1.6 5-1.6 5h15.2S18 13 18 9z"/><path d="M10 19a2 2 0 0 0 4 0"/>',
  globe:
    '<circle cx="12" cy="12" r="9"/><path d="M3.5 12h17M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
  trash: '<path d="M4 7h16M10 4h4M6 7l1 13h10l1-13"/><path d="M10 11v6M14 11v6"/>',
  eye: '<path d="M3 12c0-2.5 4-7 9-7s9 4.5 9 7-4 7-9 7-9-4.5-9-7z"/><circle cx="12" cy="12" r="2.6"/>',
  'eye-off':
    '<path d="M4 4l16 16"/><path d="M10.5 10.7a2 2 0 0 0 2.8 2.8"/><path d="M7.3 7.4C5 8.8 3 11 3 12c0 2.5 4 7 9 7 1.6 0 3.1-.4 4.4-1.1"/><path d="M11 5.1c.3 0 .7-.1 1-.1 5 0 9 4.5 9 7 0 .6-.3 1.4-.8 2.2"/>',
}

const inner = computed(() => icons[props.name] ?? '')
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <g v-html="inner" />
  </svg>
</template>

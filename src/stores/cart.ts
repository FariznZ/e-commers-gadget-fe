import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getProduct } from '@/data/products'
import type { CartLine, Product } from '@/types'

const VOUCHER_MIN = 100000
const VOUCHER_AMOUNT = 20000

const lineKey = (productId: string, variant: string) => `${productId}|${variant}`

export const useCartStore = defineStore('cart', () => {
  const lines = ref<CartLine[]>([
    { productId: 'nara-buds-lite', variant: 'Putih', quantity: 1, selected: true },
    { productId: 'nara-tumbler', variant: 'Sage · 600 ml', quantity: 1, selected: true },
  ])

  const detailed = computed(() =>
    lines.value
      .map((line) => ({ line, product: getProduct(line.productId) }))
      .filter((entry): entry is { line: CartLine; product: Product } => Boolean(entry.product)),
  )

  const count = computed(() => lines.value.reduce((sum, line) => sum + line.quantity, 0))
  const lineCount = computed(() => lines.value.length)

  const selected = computed(() => detailed.value.filter((entry) => entry.line.selected))
  const selectedCount = computed(() =>
    selected.value.reduce((sum, entry) => sum + entry.line.quantity, 0),
  )

  const subtotal = computed(() =>
    selected.value.reduce((sum, entry) => sum + entry.product.price * entry.line.quantity, 0),
  )
  const originalSubtotal = computed(() =>
    selected.value.reduce((sum, entry) => sum + entry.product.originalPrice * entry.line.quantity, 0),
  )
  const discount = computed(() => (subtotal.value >= VOUCHER_MIN ? VOUCHER_AMOUNT : 0))
  const shipping = computed(() => 0)
  const total = computed(() => subtotal.value - discount.value + shipping.value)
  const savings = computed(() => originalSubtotal.value - subtotal.value + discount.value)

  const allSelected = computed(
    () => lines.value.length > 0 && lines.value.every((line) => line.selected),
  )

  function add(product: Product, variant?: string) {
    const chosen = variant ?? product.variants[0]
    const key = lineKey(product.id, chosen)
    const existing = lines.value.find((line) => lineKey(line.productId, line.variant) === key)
    if (existing) {
      existing.quantity += 1
      existing.selected = true
      return
    }
    lines.value.push({ productId: product.id, variant: chosen, quantity: 1, selected: true })
  }

  function remove(productId: string, variant: string) {
    lines.value = lines.value.filter(
      (line) => lineKey(line.productId, line.variant) !== lineKey(productId, variant),
    )
  }

  function setQuantity(productId: string, variant: string, quantity: number) {
    const line = lines.value.find(
      (item) => lineKey(item.productId, item.variant) === lineKey(productId, variant),
    )
    if (!line) return
    line.quantity = Math.max(1, quantity)
  }

  function toggle(productId: string, variant: string) {
    const line = lines.value.find(
      (item) => lineKey(item.productId, item.variant) === lineKey(productId, variant),
    )
    if (line) line.selected = !line.selected
  }

  function toggleAll() {
    const next = !allSelected.value
    lines.value.forEach((line) => (line.selected = next))
  }

  function removeSelected() {
    lines.value = lines.value.filter((line) => !line.selected)
  }

  function clear() {
    lines.value = []
  }

  return {
    lines,
    detailed,
    count,
    lineCount,
    selected,
    selectedCount,
    subtotal,
    originalSubtotal,
    discount,
    shipping,
    total,
    savings,
    allSelected,
    voucherMin: VOUCHER_MIN,
    add,
    remove,
    setQuantity,
    toggle,
    toggleAll,
    removeSelected,
    clear,
  }
})

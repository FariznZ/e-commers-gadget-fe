import type { Order } from '@/types'

export const orders: Order[] = [
  {
    id: 'ord-001',
    reference: 'OOL-20261109-001',
    date: '9 Nov 2026 · Nara Official Gadget',
    store: 'Nara Official Gadget',
    status: 'paid',
    statusLabel: 'Lunas · paid',
    note: 'Pembayaran diterima · Menunggu proses packing gadget',
    lines: [
      { productId: 'nara-buds-lite', variant: 'Putih', quantity: 1, price: 249000 },
      { productId: 'nara-charger-gan65w', variant: 'Hitam', quantity: 1, price: 189000 },
    ],
    subtotal: 438000,
    discount: 20000,
    shipping: 0,
    total: 418000,
  },
  {
    id: 'ord-002',
    reference: 'OOL-20261102-018',
    date: '2 Nov 2026 · Nara Official Gadget',
    store: 'Nara Official Gadget',
    status: 'done',
    statusLabel: 'Selesai',
    lines: [
      { productId: 'nara-powerbank-20k', variant: 'Space Gray', quantity: 1, price: 229000 },
    ],
    subtotal: 229000,
    discount: 0,
    shipping: 0,
    total: 229000,
  },
  {
    id: 'ord-003',
    reference: 'OOL-20261025-042',
    date: '25 Okt 2026 · Nara Official Gadget',
    store: 'Nara Official Gadget',
    status: 'done',
    statusLabel: 'Selesai',
    lines: [
      { productId: 'nara-watch-active', variant: 'Hitam', quantity: 1, price: 499000 },
    ],
    subtotal: 499000,
    discount: 0,
    shipping: 0,
    total: 499000,
  },
]

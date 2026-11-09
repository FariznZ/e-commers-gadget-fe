import type { Product } from '@/types'

export const products: Product[] = [
  {
    id: 'nara-buds-lite',
    name: 'Nara Buds Lite · Earbud TWS',
    subtitle: 'Nara Buds Lite\nEarbud TWS Bluetooth 5.3',
    category: 'Elektronik',
    price: 249000,
    originalPrice: 329000,
    discountLabel: '-24%',
    rating: 4.9,
    sold: '1,2rb terjual',
    store: 'Nara Official',
    storeLocation: 'Jakarta Barat · Aktif 5 menit lalu',
    tone: 1,
    variants: ['Putih', 'Hitam'],
    features: ['Baterai 24 jam', 'Suara jernih', 'Garansi 1 tahun'],
    description:
      'Ringan di telinga, jernih di setiap nada. Nikmati koneksi stabil, kontrol sentuh, dan daya tahan hingga 24 jam bersama charging case.',
  },
  {
    id: 'nara-tumbler',
    name: 'Nara Tumbler 600 ml',
    subtitle: 'Nara Tumbler 600 ml',
    category: 'Rumah',
    price: 89000,
    originalPrice: 129000,
    discountLabel: '-31%',
    rating: 4.8,
    sold: '850 terjual',
    store: 'Nara Official',
    storeLocation: 'Jakarta Barat · Aktif 12 menit lalu',
    tone: 2,
    variants: ['Sage', 'Sand', 'Charcoal'],
    features: ['Tahan panas 12 jam', 'Bebas BPA', 'Mudah dibersihkan'],
    description:
      'Tumbler 600 ml dengan lapisan stainless ganda. Menjaga suhu minuman lebih lama dan nyaman dibawa ke mana saja.',
  },
  {
    id: 'sneakers-retro',
    name: 'Sneakers Retro Everyday',
    subtitle: 'Sneakers Retro Everyday',
    category: 'Fashion',
    price: 159000,
    originalPrice: 219000,
    discountLabel: '-27%',
    rating: 4.8,
    sold: '2rb terjual',
    store: 'Everyday Store',
    storeLocation: 'Bandung · Aktif 3 menit lalu',
    tone: 3,
    variants: ['Cokelat · 38', 'Cokelat · 39', 'Cokelat · 40'],
    features: ['Ringan dipakai', 'Sol anti selip', 'Bahan breathable'],
    description:
      'Sneakers bergaya retro dengan sol empuk untuk pemakaian harian. Desain netral mudah dipadukan dengan gaya apa pun.',
  },
  {
    id: 'ransel-daily',
    name: 'Ransel Daily Daypack',
    subtitle: 'Ransel Daily Daypack',
    category: 'Fashion',
    price: 129000,
    originalPrice: 179000,
    discountLabel: '-28%',
    rating: 4.9,
    sold: '640 terjual',
    store: 'Daily Goods',
    storeLocation: 'Yogyakarta · Aktif 8 menit lalu',
    tone: 4,
    variants: ['Beige', 'Hitam'],
    features: ['Muat 14 inci', 'Punggung empuk', 'Water repellent'],
    description:
      'Ransel ringkas untuk harian dengan kompartemen laptop 14 inci, saku serbaguna, dan bahan tahan cipratan air.',
  },
]

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

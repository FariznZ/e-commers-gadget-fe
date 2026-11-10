export type Category =
  | 'Semua'
  | 'Elektronik'
  | 'Smartphone'
  | 'Laptop'
  | 'Audio'
  | 'Wearable'
  | 'Aksesoris'
  | string

export interface Product {
  // Properti wajib dari database Supabase
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: Category
  stock: number
  created_at?: string

  // Properti desain opsional (mendukung mock & variasi UI)
  subtitle?: string
  originalPrice?: number
  discountLabel?: string
  rating?: number
  sold?: string
  store?: string
  storeLocation?: string
  tone?: 1 | 2 | 3 | 4
  variants?: string[]
  features?: string[]
}

export interface CartLine {
  productId: string
  variant: string
  quantity: number
  selected: boolean
}

export interface OrderLine {
  productId: string
  variant: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  reference: string
  date: string
  store: string
  status: 'paid' | 'done' | 'cancelled'
  statusLabel: string
  note?: string
  lines: OrderLine[]
  subtotal: number
  discount: number
  shipping: number
  total: number
}

export interface User {
  id?: string
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  postalCode?: string
  membership?: string
}
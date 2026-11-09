export type Category = 'Elektronik' | 'Fashion' | 'Kecantikan' | 'Rumah' | 'Lainnya'

export interface Product {
  id: string
  name: string
  subtitle?: string
  category: Category
  price: number
  originalPrice: number
  discountLabel: string
  rating: number
  sold: string
  store: string
  storeLocation: string
  tone: 1 | 2 | 3 | 4
  variants: string[]
  features: string[]
  description: string
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
  name: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  membership: string
}

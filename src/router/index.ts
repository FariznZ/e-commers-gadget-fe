import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { navActive: 'beranda' },
    },
    {
      path: '/jelajah',
      name: 'catalog',
      component: () => import('@/views/CatalogView.vue'),
      meta: { navActive: 'jelajah' },
    },
    {
      path: '/produk/:id',
      name: 'product-detail',
      component: () => import('@/views/ProductDetailView.vue'),
      meta: { hideNav: true },
    },
    {
      path: '/keranjang',
      name: 'cart',
      component: () => import('@/views/CartView.vue'),
      meta: { navActive: 'keranjang' },
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/CheckoutView.vue'),
      meta: { hideNav: true },
    },
    {
      path: '/pembayaran-berhasil',
      name: 'payment-success',
      component: () => import('@/views/PaymentSuccessView.vue'),
      meta: { hideNav: true },
    },
    {
      path: '/pesanan',
      name: 'orders',
      component: () => import('@/views/OrdersView.vue'),
      meta: { navActive: 'akun' },
    },
    {
      path: '/masuk',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { hideNav: true },
    },
    {
      path: '/daftar',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
      meta: { hideNav: true },
    },
    {
      path: '/profil',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { navActive: 'akun' },
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

// Navigation Guard: Menjaga semua rute agar wajib login terlebih dahulu
router.beforeEach(async (to, _from, next) => {
  const auth = useAuthStore()

  // Pastikan sesi Supabase telah dicek saat aplikasi pertama kali dibuka
  if (!auth.isInitialized) {
    await auth.init()
  }

  const publicRoutes = ['/masuk', '/daftar']
  const isPublic = publicRoutes.includes(to.path)

  // 1. Jika pengguna belum login dan mencoba mengakses rute tertutup, arahkan ke /masuk
  if (!auth.isAuthenticated && !isPublic) {
    return next({
      path: '/masuk',
      query: to.path !== '/' ? { redirect: to.fullPath } : undefined,
    })
  }

  // 2. Jika pengguna sudah login dan membuka halaman /masuk atau /daftar, alihkan ke beranda
  if (auth.isAuthenticated && isPublic) {
    return next('/')
  }

  next()
})

export default router

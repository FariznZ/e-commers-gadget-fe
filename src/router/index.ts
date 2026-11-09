import { createRouter, createWebHistory } from 'vue-router'

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

export default router

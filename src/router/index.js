import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import HomeView from '../views/Home.vue'
import CategoryView from '../views/CategoryView.vue'
import ProductDetail from '../views/ProductDetail.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import Profile from '../components/Profile.vue'
import Favorites from '../components/Favorites.vue'
import OrdersView from '../views/OrdersView.vue'
import Settings from '../components/Settings.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/category/:id',
    name: 'category',
    component: CategoryView
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductDetail
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersView,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth) {
    const isAuthenticated = !!authStore.token && !!authStore.user
    
    if (!isAuthenticated) {
      // If not authenticated, redirect to login
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
      return
    }

    // Validate token by checking user data
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user`, {
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Accept': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Invalid token')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      authStore.logout()
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
      return
    }
  }
  
  next()
})

export default router
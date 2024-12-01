import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import CategoryView from '../views/CategoryView.vue'
import ProductDetail from '../views/ProductDetail.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import Profile from '../components/Profile.vue'
import Favorites from '../components/Favorites.vue'
import OrdersView from '../views/OrdersView.vue'
import Settings from '../components/Settings.vue'
import PersonalInfo from '@/components/PersonalInfo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      component: CheckoutView
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersView
    },
    {
      path: '/profile/personal',
      name: 'personal',
      name: 'personal',
      component: PersonalInfo
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})

export default router
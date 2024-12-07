<template>
  <main class="py-4">
      <h1 class="text-2xl font-bold mb-4">{{ $t('checkout.title') }}</h1>
      
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Checkout form -->
        <div class="lg:w-2/3">
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6 mb-4">
            <h2 class="text-xl font-semibold mb-6">{{ $t('checkout.personal_info') }}</h2>
            
            <form @submit.prevent="submitOrder" class="space-y-6">
              <!-- Contact Information -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ $t('checkout.first_name') }}</label>
                  <input 
                    type="text" 
                    v-model="form.firstName"
                    class="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                    required
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ $t('checkout.last_name') }}</label>
                  <input 
                    type="text" 
                    v-model="form.lastName"
                    class="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                    required
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ $t('checkout.phone') }}</label>
                  <input 
                    type="tel" 
                    v-model="form.phone"
                    class="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                    required
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ $t('checkout.email') }}</label>
                  <input 
                    type="email" 
                    v-model="form.email"
                    class="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                  >
                </div>
              </div>

              <!-- Delivery Methods -->
              <div class="space-y-4">
                <h3 class="text-lg font-medium">{{ $t('checkout.shipping_method') }}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <label 
                    v-for="method in deliveryMethods" 
                    :key="method.id"
                    class="relative flex cursor-pointer rounded-lg border bg-white dark:bg-gray-900 p-4 focus:outline-none"
                    :class="selectedDeliveryMethod.id === method.id ? 'border-primary-500 ring-2 ring-primary-500' : 'border-gray-300 dark:border-gray-700'"
                  >
                    <input
                      type="radio"
                      :name="method.id"
                      :value="method"
                      v-model="selectedDeliveryMethod"
                      class="sr-only"
                    />
                    <div class="flex w-full items-center justify-between">
                      <div class="flex items-center">
                        <div class="text-sm">
                          <p class="font-medium text-gray-900 dark:text-white">
                            {{ $t(`checkout.shipping_methods.${method.id}.title`) }}
                          </p>
                          <p class="text-gray-500 dark:text-gray-400">
                            {{ $t(`checkout.shipping_methods.${method.id}.description`) }}
                          </p>
                          <p class="text-sm font-medium text-primary-600 dark:text-primary-400 mt-1">
                            {{ method.price === 0 ? $t('checkout.free') : formatPrice(method.price) }}
                          </p>
                        </div>
                      </div>
                      <div v-if="selectedDeliveryMethod.id === method.id" class="shrink-0 text-primary-500 dark:text-primary-400">
                        <i class="ri-check-line text-lg"></i>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Payment Methods -->
              <div class="space-y-4">
                <h3 class="text-lg font-medium">{{ $t('checkout.payment_method') }}</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label 
                    v-for="method in paymentMethods" 
                    :key="method.id"
                    class="relative flex p-4 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
                    :class="{ 'border-primary-500 bg-primary-50 dark:bg-primary-900/30': form.paymentMethod === method.id }"
                  >
                    <input
                      type="radio"
                      :name="method.id"
                      :value="method.id"
                      v-model="form.paymentMethod"
                      class="sr-only"
                    />
                    <div class="flex items-center w-full">
                      <i :class="[method.icon, 'text-2xl mr-3', form.paymentMethod === method.id ? 'text-primary-500 dark:text-primary-400' : 'text-gray-400 dark:text-gray-600']"></i>
                      <span class="font-medium" :class="form.paymentMethod === method.id ? 'text-primary-700 dark:text-primary-500' : 'text-gray-700 dark:text-gray-400'">
                        {{ method.id.charAt(0).toUpperCase() + method.id.slice(1) }}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <button 
                type="submit"
                class="w-full bg-primary-600 dark:bg-primary-500 text-white py-3 rounded-xl hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
              >
                {{ $t('checkout.place_order') }}
              </button>
            </form>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:w-1/3">
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6 sticky top-4">
            <h3 class="text-lg font-semibold mb-4">{{ $t('checkout.order_summary') }}</h3>
            
            <!-- Cart Items -->
            <div class="space-y-4 mb-6">
              <div v-for="item in cartItems" :key="item.id" class="flex justify-between">
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">{{ item.name }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('checkout.quantity') }}: {{ item.quantity }}</p>
                </div>
                <p class="font-medium text-gray-900 dark:text-white">{{ formatPrice(item.price * item.quantity) }}</p>
              </div>
            </div>

            <!-- Totals -->
            <div class="border-t pt-4 space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">{{ t('checkout.subtotal') }}</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ formatPrice(subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">{{ t('checkout.shipping') }}</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ shippingCost === 0 ? t('checkout.free') : formatPrice(shippingCost) }}</span>
              </div>
              <div class="flex justify-between text-lg font-semibold">
                <span>{{ t('checkout.total') }}</span>
                <span>{{ formatPrice(total) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Banner from '../components/Banner.vue'

const { t } = useI18n()

// Form data
const form = ref({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  paymentMethod: null
})

// Delivery methods
const deliveryMethods = [
  {
    id: 'standard',
    price: 0
  },
  {
    id: 'express',
    price: 50000
  },
  {
    id: 'pickup',
    price: 0
  }
]

const selectedDeliveryMethod = ref(deliveryMethods[0])

// Payment methods
const paymentMethods = [
  { id: 'cash', icon: 'ri-money-dollar-circle-line' },
  { id: 'card', icon: 'ri-bank-card-line' },
  { id: 'click', icon: 'ri-smartphone-line' }
]

// Cart items (example data)
const cartItems = ref([
  {
    id: 1,
    name: 'Product 1',
    price: 100000,
    quantity: 2
  },
  {
    id: 2,
    name: 'Product 2',
    price: 150000,
    quantity: 1
  }
])

// Computed properties
const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
})

const shippingCost = computed(() => {
  return selectedDeliveryMethod.value?.price || 0
})

const total = computed(() => {
  return subtotal.value + shippingCost.value
})

// Format price helper
const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

// Submit order
const submitOrder = () => {
  // TODO: Implement order submission
  console.log('Order submitted:', {
    ...form.value,
    deliveryMethod: selectedDeliveryMethod.value,
    items: cartItems.value,
    total: total.value
  })
}
</script>

<style scoped>
.sticky {
  position: sticky;
  top: 1rem;
}
</style>

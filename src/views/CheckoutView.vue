<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-8">{{ t('checkout.title') }}</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Checkout Form -->
      <div class="lg:col-span-2 space-y-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-6">{{ t('checkout.delivery_info.title') }}</h2>
          <form @submit.prevent="submitOrder" class="space-y-6">
            <!-- Personal Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('checkout.delivery_info.full_name') }} *
                </label>
                <input 
                  v-model="formData.delivery_name"
                  type="text"
                  class="w-full p-2 border rounded focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  :placeholder="t('checkout.delivery_info.full_name')"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('checkout.delivery_info.phone') }} *
                </label>
                <input 
                  v-model="formData.delivery_phone"
                  type="tel"
                  class="w-full p-2 border rounded focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="+998"
                  required
                />
              </div>
            </div>

            <!-- Address Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('checkout.delivery_info.region') }} *
                </label>
                <input 
                  v-model="formData.delivery_region"
                  type="text"
                  class="w-full p-2 border rounded focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  :placeholder="t('checkout.delivery_info.region')"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('checkout.delivery_info.district') }} *
                </label>
                <input 
                  v-model="formData.delivery_district"
                  type="text"
                  class="w-full p-2 border rounded focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  :placeholder="t('checkout.delivery_info.district')"
                  required
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('checkout.delivery_info.address') }} *
              </label>
              <input 
                v-model="formData.delivery_address"
                type="text"
                class="w-full p-2 border rounded focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                :placeholder="t('checkout.delivery_info.address')"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('checkout.delivery_info.comment') }}
              </label>
              <textarea 
                v-model="formData.delivery_comment"
                class="w-full p-2 border rounded focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                :placeholder="t('checkout.delivery_info.comment')"
                rows="3"
              ></textarea>
            </div>

            <!-- Delivery Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('checkout.delivery_info.delivery_date') }} *
              </label>
              <input 
                v-model="formData.desired_delivery_date"
                type="date"
                class="w-full p-2 border rounded focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                :min="minDeliveryDate"
                :max="maxDeliveryDate"
                required
              />
            </div>

            <!-- Delivery Method -->
            <div>
              <h3 class="text-lg font-medium mb-4">{{ t('checkout.delivery_method.title') }}</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="method in deliveryMethods"
                  :key="method.id"
                  class="border rounded-lg p-4 cursor-pointer transition-colors"
                  :class="{
                    'border-purple-500 bg-purple-50 dark:bg-purple-900/10': formData.delivery_method_id === method.id,
                    'hover:border-purple-300': formData.delivery_method_id !== method.id
                  }"
                  @click="formData.delivery_method_id = method.id"
                >
                  <div class="flex items-start space-x-3">
                    <input
                      type="radio"
                      :value="method.id"
                      v-model="formData.delivery_method_id"
                      class="mt-1"
                      required
                    />
                    <div>
                      <h4 class="font-medium">{{ t(`checkout.delivery_method.${method.type}`) }}</h4>
                      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {{ t(`checkout.delivery_method.${method.type}_description`) }}
                      </p>
                      <p class="text-sm font-medium text-purple-600 mt-1">
                        {{ formatPrice(method.base_cost) }} {{ t('currency') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div>
              <h3 class="text-lg font-medium mb-4">{{ t('checkout.payment_method.title') }}</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="method in paymentMethods"
                  :key="method.id"
                  class="border rounded-lg p-4 cursor-pointer transition-colors"
                  :class="{
                    'border-purple-500 bg-purple-50 dark:bg-purple-900/10': formData.payment_method_id === method.id,
                    'hover:border-purple-300': formData.payment_method_id !== method.id
                  }"
                  @click="formData.payment_method_id = method.id"
                >
                  <div class="flex items-start space-x-3">
                    <input
                      type="radio"
                      :value="method.id"
                      v-model="formData.payment_method_id"
                      class="mt-1"
                      required
                    />
                    <div>
                      <h4 class="font-medium">{{ t(`checkout.payment_method.${method.type}`) }}</h4>
                      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {{ t(`checkout.payment_method.${method.type}_description`) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting || !cartItems.length"
              class="w-full mt-6 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors dark:bg-purple-500 dark:hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isSubmitting ? t('checkout.processing') : t('checkout.place_order') }}
            </button>
          </form>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 sticky top-8">
          <h2 class="text-xl font-semibold mb-6">{{ t('checkout.cart_summary') }}</h2>
          
          <!-- Cart Items -->
          <div class="space-y-4 mb-6">
            <div v-for="item in cartItems" :key="item.id" class="flex items-center space-x-4">
              <img :src="item.image" alt="Product" class="w-16 h-16 object-cover rounded" />
              <div class="flex-1">
                <h3 class="font-medium">{{ item.name }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ item.attributes?.color || item.product_variant?.attribute_values?.Color }}
                  {{ item.attributes?.storage || item.product_variant?.attribute_values?.Storage }}
                </p>
                <div class="flex justify-between items-center mt-1">
                  <p class="font-medium">{{ formatPrice(item.price) }} {{ t('currency') }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">x{{ item.quantity }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Total -->
          <div class="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">{{ t('checkout.subtotal') }}</span>
              <span class="font-medium">{{ formatPrice(subtotal) }} {{ t('currency') }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">{{ t('checkout.delivery_fee') }}</span>
              <span class="font-medium">{{ formatPrice(deliveryCost) }} {{ t('currency') }}</span>
            </div>
            <div class="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
              <span class="text-lg font-medium">{{ t('checkout.total') }}</span>
              <span class="text-lg font-medium">{{ formatPrice(total) }} {{ t('currency') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const cartStore = useCartStore()
const { t } = useI18n()

// Form data
const formData = ref({
  delivery_method_id: null,
  payment_method_id: null,
  delivery_name: '',
  delivery_phone: '',
  delivery_region: '',
  delivery_district: '',
  delivery_address: '',
  delivery_comment: '',
  desired_delivery_date: ''
})

// Cart items
const cartItems = computed(() => cartStore.items || [])

// Submit state
const isSubmitting = ref(false)

const formatOrderData = () => {
  console.log('Cart items:', cartItems.value)
  const items = cartItems.value.map(item => {
    console.log('Item:', item)
    return {
      product_id: item.product_id || item.product?.id,
      product_variant_id: item.product_variant_id || item.product_variant?.id,
      quantity: item.quantity
    }
  })

  const orderData = {
    delivery_method_id: formData.value.delivery_method_id,
    payment_method_id: formData.value.payment_method_id,
    delivery_name: formData.value.delivery_name,
    delivery_phone: formData.value.delivery_phone.replace(/\D/g, ''),
    delivery_region: formData.value.delivery_region,
    delivery_district: formData.value.delivery_district,
    delivery_address: formData.value.delivery_address,
    delivery_comment: formData.value.delivery_comment || '',
    desired_delivery_date: formData.value.desired_delivery_date,
    items: items
  }

  console.log('Order data:', orderData)
  return orderData
}

// Mock delivery and payment methods (replace with API data)
const deliveryMethods = ref([
  {
    id: 1,
    type: 'standard',
    base_cost: 30000,
    translations: [
      {
        locale: 'en',
        name: t('checkout.delivery_method.standard'),
        description: t('checkout.delivery_method.standard_description')
      }
    ]
  },
  {
    id: 2,
    type: 'express',
    base_cost: 50000,
    translations: [
      {
        locale: 'en',
        name: t('checkout.delivery_method.express'),
        description: t('checkout.delivery_method.express_description')
      }
    ]
  }
])

const paymentMethods = ref([
  {
    id: 1,
    type: 'cash',
    translations: [
      {
        locale: 'en',
        name: t('checkout.payment_method.cash'),
        description: t('checkout.payment_method.cash_description')
      }
    ]
  },
  {
    id: 2,
    type: 'card',
    translations: [
      {
        locale: 'en',
        name: t('checkout.payment_method.card'),
        description: t('checkout.payment_method.card_description')
      }
    ]
  },
  {
    id: 3,
    type: 'click',
    translations: [
      {
        locale: 'en',
        name: t('checkout.payment_method.click'),
        description: t('checkout.payment_method.click_description')
      }
    ]
  }
])

// Calculations
const subtotal = computed(() => {
  if (!cartItems.value) return 0
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const deliveryCost = computed(() => {
  const method = deliveryMethods.value.find(m => m.id === formData.value.delivery_method_id)
  return method ? method.base_cost : 0
})

const total = computed(() => {
  return subtotal.value + deliveryCost.value
})

// Form validation
const formErrors = ref({})

const validateForm = () => {
  formErrors.value = {}
  
  // Required fields
  if (!formData.value.delivery_name) {
    formErrors.value.delivery_name = t('checkout.errors.name_required')
  }
  if (!formData.value.delivery_phone) {
    formErrors.value.delivery_phone = t('checkout.errors.phone_required')
  }
  if (!formData.value.delivery_region) {
    formErrors.value.delivery_region = t('checkout.errors.region_required')
  }
  if (!formData.value.delivery_district) {
    formErrors.value.delivery_district = t('checkout.errors.district_required')
  }
  if (!formData.value.delivery_address) {
    formErrors.value.delivery_address = t('checkout.errors.address_required')
  }
  if (!formData.value.desired_delivery_date) {
    formErrors.value.desired_delivery_date = t('checkout.errors.date_required')
  }
  if (!formData.value.delivery_method_id) {
    formErrors.value.delivery_method = t('checkout.errors.delivery_method_required')
  }
  if (!formData.value.payment_method_id) {
    formErrors.value.payment_method = t('checkout.errors.payment_method_required')
  }

  // Phone number validation
  const phoneRegex = /^\+?998[0-9]{9}$/
  if (formData.value.delivery_phone && !phoneRegex.test(formData.value.delivery_phone)) {
    formErrors.value.delivery_phone = t('checkout.errors.invalid_phone')
  }

  // Date validation
  const selectedDate = new Date(formData.value.desired_delivery_date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (selectedDate < today) {
    formErrors.value.desired_delivery_date = t('checkout.errors.date_past')
  }

  return Object.keys(formErrors.value).length === 0
}

// Delivery date limits
const minDeliveryDate = ref('')
const maxDeliveryDate = ref('')

// Update delivery date limits based on selected delivery method
const updateDeliveryDateLimits = () => {
  const today = new Date()
  minDeliveryDate.value = today.toISOString().split('T')[0]

  const maxDate = new Date()
  maxDate.setDate(today.getDate() + 14) // Maximum 2 weeks ahead
  maxDeliveryDate.value = maxDate.toISOString().split('T')[0]
}

// Initialize delivery date limits
onMounted(() => {
  updateDeliveryDateLimits()
})

// Helpers
const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price)
}

// Submit order
const submitOrder = async () => {
  if (isSubmitting.value) return
  
  // Validate form
  if (!validateForm()) {
    // Show error message
    alert(t('checkout.errors.please_fill_required'))
    return
  }

  isSubmitting.value = true

  try {
    const orderData = formatOrderData()
    console.log('Sending order data:', orderData)

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(orderData)
    })

    const data = await response.json()
    console.log('API response:', data)

    if (!response.ok) {
      // Show validation errors if any
      if (data.errors) {
        console.log('Validation errors:', data.errors)
        const errorMessages = Object.entries(data.errors)
          .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
          .join('\n')
        throw new Error(errorMessages)
      }
      throw new Error(data.message || t('checkout.errors.failed_to_create'))
    }

    // Clear cart
    cartStore.clearCart()
    
    // Redirect to success page
    router.push({
      name: 'order-success',
      params: { id: data.data.id }
    })
  } catch (error) {
    console.error('Order submission error:', error)
    alert(error.message || t('checkout.errors.something_went_wrong'))
  } finally {
    isSubmitting.value = false
  }
}
</script>

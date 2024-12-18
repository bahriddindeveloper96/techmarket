<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Success Message -->
    <div
      v-if="showSuccessMessage"
      class="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded-lg flex justify-between items-center"
    >
      <span>{{ $t('reviews.thank_you') }}</span>
      <button
        @click="showSuccessMessage = false"
        class="text-green-700 dark:text-green-100 hover:opacity-75"
      >
        <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <h1 class="text-2xl font-bold mb-6">{{ $t('orders.title') }}</h1>
    
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="error" class="text-red-500 text-center py-8">
      {{ error }}
    </div>

    <div v-else-if="orders.length === 0" class="text-center py-8">
      <p class="text-gray-500">{{ $t('orders.no_orders') }}</p>
    </div>

    <div v-else class="space-y-6">
      <div v-for="order in orders" :key="order.id" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h2 class="text-lg font-semibold">{{ $t('orders.order_number') }}{{ order.order_number }}</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ new Date(order.created_at).toLocaleDateString() }}
            </p>
          </div>
          <div class="text-right">
            <span class="px-3 py-1 rounded-full text-sm capitalize" 
                  :class="{
                    'bg-yellow-100 text-yellow-800': order.status === 'pending',
                    'bg-green-100 text-green-800': order.status === 'completed',
                    'bg-blue-100 text-blue-800': order.status === 'new',
                    'bg-red-100 text-red-800': order.status === 'cancelled'
                  }">
              {{ $t(`orders.status.${order.status}`) }}
            </span>
          </div>
        </div>

        <div class="space-y-4">
          <!-- Order Items -->
          <div v-for="item in order.items" :key="item.id" class="flex items-center space-x-4 py-4 border-t">
            <img :src="item.product_variant.images[0]" :alt="item.product.name" 
                 class="w-20 h-20 object-cover rounded-lg">
            <div class="flex-1">
              <h3 class="font-medium">{{ item.product.name }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ Object.entries(item.product_variant.attribute_values).map(([key, value]) => `${key}: ${value}`).join(', ') }}
              </p>
              <p class="text-sm">{{ $t('orders.quantity') }}: {{ item.quantity }}</p>
            </div>
            <div class="text-right flex flex-col space-y-2">
              <p class="font-medium">${{ item.price }}</p>
              <button
                v-if="order.status === 'completed' && !item.has_review && !item.product.has_user_review"
                @click="openReviewModal(order, item)"
                class="px-3 py-1 text-sm bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
              >
                {{ $t('orders.write_review') }}
              </button>
              <p 
                v-else-if="item.has_review || item.product.has_user_review" 
                class="text-sm text-gray-500 dark:text-gray-400"
              >
                {{ $t('reviews.already_reviewed') }}
              </p>
            </div>
          </div>

          <!-- Order Details -->
          <div class="border-t pt-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <h4 class="font-medium mb-2">{{ $t('orders.delivery_details') }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ order.delivery_name }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ order.delivery_phone }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ order.delivery_region }}, {{ order.delivery_district }}<br>
                  {{ order.delivery_address }}
                </p>
              </div>
              <div>
                <h4 class="font-medium mb-2">{{ $t('orders.payment_details') }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ $t('orders.payment_method') }}: {{ order.payment_method.translations.find(t => t.locale === currentLocale).name }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ $t('orders.payment_status') }}: <span class="capitalize">{{ order.payment_status }}</span>
                </p>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="border-t pt-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">{{ $t('orders.subtotal') }}:</span>
              <span>${{ order.total_amount }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">{{ $t('orders.delivery') }}:</span>
              <span>${{ order.delivery_cost }}</span>
            </div>
            <div class="flex justify-between items-center font-medium mt-2">
              <span>{{ $t('orders.total') }}:</span>
              <span>${{ (parseFloat(order.total_amount) + parseFloat(order.delivery_cost)).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Review Modal -->
    <ReviewModal
      v-if="showReviewModal"
      :is-open="showReviewModal"
      :product="selectedProduct"
      :order="selectedOrder"
      @close="closeReviewModal"
      @submitted="handleReviewSubmitted"
    />

    <!-- Pagination -->
    <div v-if="pagination && pagination.last_page > 1" class="flex justify-center mt-8">
      <nav class="flex space-x-2">
        <button
          v-for="link in pagination.links"
          :key="link.label"
          @click="goToPage(link.url)"
          :disabled="!link.url || link.active"
          :class="[
            'px-3 py-1 rounded',
            {
              'bg-primary-600 text-white': link.active,
              'bg-gray-100 text-gray-700 hover:bg-gray-200': !link.active && link.url,
              'bg-gray-50 text-gray-400 cursor-not-allowed': !link.url
            }
          ]"
          v-html="link.label"
        ></button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useI18n } from 'vue-i18n'
import ReviewModal from '../components/ReviewModal.vue'

const authStore = useAuthStore()
const { locale } = useI18n()
const currentLocale = computed(() => locale.value)

const orders = ref([])
const loading = ref(true)
const error = ref(null)
const pagination = ref(null)
const showSuccessMessage = ref(false)

// Review modal state
const showReviewModal = ref(false)
const selectedProduct = ref(null)
const selectedOrder = ref(null)

const openReviewModal = (order, item) => {
  selectedOrder.value = order
  selectedProduct.value = {
    id: item.product.id,
    name: item.product.name,
    images: item.product_variant.images || []
  }
  showReviewModal.value = true
}

const closeReviewModal = () => {
  showReviewModal.value = false
  selectedProduct.value = null
  selectedOrder.value = null
}

const handleReviewSubmitted = async (formData) => {
  try {
    // Convert FormData to base64 strings
    const imagePromises = Array.from(formData.getAll('images')).map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          // Get base64 string without the prefix (data:image/jpeg;base64,)
          const base64String = reader.result.split(',')[1]
          resolve(base64String)
        }
        reader.readAsDataURL(file)
      })
    })

    const base64Images = await Promise.all(imagePromises)

    const reviewData = {
      rating: parseInt(formData.get('rating')),
      comment: formData.get('comment'),
      images: base64Images
    }

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/${selectedProduct.value.id}/reviews`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authStore.getToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to submit review')
    }

    // Update the local order state
    const orderIndex = orders.value.findIndex(o => o.id === selectedOrder.value.id)
    if (orderIndex !== -1) {
      const itemIndex = orders.value[orderIndex].items.findIndex(
        item => item.product.id === selectedProduct.value.id
      )
      if (itemIndex !== -1) {
        orders.value[orderIndex].items[itemIndex].has_review = true
      }
    }

    // Show success message
    showSuccessMessage.value = true
    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 5000)

    closeReviewModal()
  } catch (error) {
    console.error('Error submitting review:', error)
  }
}

const fetchOrders = async (page = 1) => {
  try {
    loading.value = true
    error.value = null

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${authStore.getToken}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch orders')
    }

    const data = await response.json()
    orders.value = data.data.data
    pagination.value = {
      current_page: data.data.current_page,
      last_page: data.data.last_page,
      links: data.data.links
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const goToPage = (url) => {
  if (!url) return
  const page = new URL(url).searchParams.get('page')
  fetchOrders(page)
}

onMounted(() => {
  fetchOrders()
})
</script>
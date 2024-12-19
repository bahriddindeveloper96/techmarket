<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50" @close="emit('close')">
      <!-- Backdrop -->
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      </TransitionChild>

      <!-- Modal -->
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
              <!-- Error Alert -->
              <div v-if="error" class="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
                {{ error }}
              </div>

              <!-- Content -->
              <div class="space-y-4">
                <!-- Header -->
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                  {{ $t('reviews.write_review') }}
                </DialogTitle>
                <button
                  @click="$emit('close')"
                  class="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg class="w-5 h-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>

              <div class="mb-6">
                <div class="flex items-center space-x-4">
                  <img 
                    :src="product?.images?.[0] || product?.image" 
                    :alt="product?.name"
                    class="w-20 h-20 object-cover rounded-lg border dark:border-gray-700"
                  >
                  <div>
                    <h4 class="font-medium text-gray-900 dark:text-white">{{ product?.name }}</h4>
                    <p class="text-sm text-gray-500">{{ $t('orders.order') }} #{{ order?.order_number }}</p>
                  </div>
                </div>
              </div>

              <div class="mt-4">
                <!-- Product Images Gallery -->
                <div class="mb-6">
                  <div class="relative">
                    <div class="flex space-x-2 overflow-x-auto pb-2">
                      <div
                        v-for="(image, index) in product.images"
                        :key="index"
                        class="flex-shrink-0"
                      >
                        <img
                          :src="image"
                          :alt="`${product.name} - ${index + 1}`"
                          class="h-24 w-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                          @click="selectedImageIndex = index"
                        />
                      </div>
                    </div>
                    
                    <!-- Main Image -->
                    <div v-if="product.images.length > 0" class="mt-4">
                      <img
                        :src="product.images[selectedImageIndex]"
                        :alt="product.name"
                        class="w-full h-64 object-contain rounded-lg border dark:border-gray-700"
                      />
                    </div>
                  </div>
                </div>

                <!-- Rating Stars -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ $t('reviews.rating') }}
                  </label>
                  <div class="flex items-center space-x-1">
                    <button
                      v-for="star in 5"
                      :key="star"
                      @click="rating = star"
                      @mouseenter="hoverRating = star"
                      @mouseleave="hoverRating = 0"
                      class="text-2xl focus:outline-none transition-colors"
                      :class="[
                        star <= (hoverRating || rating)
                          ? 'text-yellow-400 hover:text-yellow-500'
                          : 'text-gray-300 dark:text-gray-600 hover:text-gray-400 dark:hover:text-gray-500'
                      ]"
                    >
                      ★
                    </button>
                    <span class="ml-2 text-sm text-gray-500">
                      {{ rating ? `${rating}/5` : $t('reviews.select_rating') }}
                    </span>
                  </div>
                </div>

                <div>
                  <label 
                    for="review"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {{ $t('reviews.your_review') }}
                  </label>
                  <textarea
                    id="review"
                    v-model="comment"
                    rows="4"
                    class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 resize-none"
                    :placeholder="$t('reviews.write_your_review')"
                  ></textarea>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ $t('reviews.min_length', { count: 3 }) }}
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ $t('reviews.photos') }}
                  </label>
                  <div class="flex flex-wrap gap-2 mb-2">
                    <div
                      v-for="(image, index) in previewImages"
                      :key="index"
                      class="relative w-20 h-20 group"
                    >
                      <img
                        :src="image"
                        class="w-full h-full object-cover rounded-lg border dark:border-gray-700"
                      />
                      <button
                        @click="removeImage(index)"
                        class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <label
                      v-if="previewImages.length < 5"
                      class="w-20 h-20 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 transition-colors"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        class="hidden"
                        @change="handleImageUpload"
                        multiple
                      />
                      <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </label>
                  </div>
                  <p class="text-sm text-gray-500">
                    {{ $t('reviews.max_photos', { count: 5 }) }}
                  </p>
                </div>
              </div>

              <div class="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  @click="$emit('close')"
                >
                  {{ $t('common.cancel') }}
                </button>
                <button
                  type="button"
                  :disabled="!isValid || loading"
                  class="inline-flex justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  @click="submitReview"
                >
                  {{ $t('common.submit') }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '../stores/authStore'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

const authStore = useAuthStore()

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  product: {
    type: Object,
    required: true
  },
  order: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'submitted'])

const selectedImageIndex = ref(0)
const rating = ref(0)
const hoverRating = ref(0)
const comment = ref('')
const images = ref([])
const previewImages = ref([])
const loading = ref(false)
const error = ref(null)

// Reset form when modal opens
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    selectedImageIndex.value = 0
    rating.value = 0
    hoverRating.value = 0
    comment.value = ''
    images.value = []
    previewImages.value = []
    error.value = null
  }
})

const isValid = computed(() => {
  return rating.value > 0 && comment.value.trim().length >= 3
})

const handleImageUpload = async (event) => {
  const files = Array.from(event.target.files)
  const remainingSlots = 5 - previewImages.value.length
  const validFiles = files.slice(0, remainingSlots)

  for (const file of validFiles) {
    if (file.type.startsWith('image/')) {
      try {
        const base64String = await convertToBase64(file)
        previewImages.value.push(URL.createObjectURL(file)) // For preview
        images.value.push(base64String) // For API
      } catch (err) {
       // console.error('Error converting image:', err)
      }
    }
  }
}

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const base64String = reader.result.split(',')[1]
      resolve(base64String)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  previewImages.value.splice(index, 1)
  images.value.splice(index, 1)
}

const submitReview = async () => {
  if (!isValid.value || loading.value) return

  loading.value = true
  error.value = null

  try {
    const reviewData = {
      rating: rating.value,
      comment: comment.value.trim(),
      images: images.value
    }

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/${props.product.id}/reviews`, {
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

    emit('submitted', reviewData)
    emit('close')
  } catch (err) {
    error.value = err.message || 'An error occurred while submitting the review'
   // console.error('Error submitting review:', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end sm:items-center justify-center min-h-screen text-center sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="close"></div>

        <!-- Modal panel -->
        <div class="relative w-full sm:max-w-4xl bg-white dark:bg-gray-900 text-left overflow-hidden shadow-xl transform transition-all sm:rounded-lg">
          <!-- Close button -->
          <button
            @click="close"
            class="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
          >
            <i class="fas fa-times text-gray-500 dark:text-gray-400"></i>
          </button>
          
          <div class="flex flex-col sm:flex-row w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
            <!-- Left Column - Product Images -->
            <div class="w-full sm:w-1/2 p-4 sm:p-6 space-y-4">
              <div class="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img 
                  :src="selectedImage || product.images[0]" 
                  :alt="product.name" 
                  class="w-full h-full object-contain"
                >
              </div>
              <div class="grid grid-cols-4 gap-2">
                <button
                  v-for="(image, index) in product.images"
                  :key="index"
                  @click="selectedImage = image"
                  class="aspect-square rounded-lg overflow-hidden border-2 bg-gray-100 dark:bg-gray-800"
                  :class="selectedImage === image ? 'border-primary-500' : 'border-transparent'"
                >
                  <img :src="image" :alt="product.name" class="w-full h-full object-contain">
                </button>
              </div>
            </div>

            <!-- Right Column - Product Info -->
            <div class="w-full sm:w-1/2 p-4 sm:p-6 space-y-6 border-t sm:border-t-0 sm:border-l border-gray-200 dark:border-gray-700">
              <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{{ product.name }}</h2>
              
              <!-- Price -->
              <div class="flex items-center space-x-4">
                <span class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {{ formatPrice(selectedVariant?.price || product.price) }} {{ $t('currency') }}
                </span>
                <span v-if="product.oldPrice" class="text-lg sm:text-xl text-gray-500 line-through">
                  {{ formatPrice(product.oldPrice) }} {{ $t('currency') }}
                </span>
              </div>

              <!-- Color Selection -->
              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {{ $t('product.select_color') }}
                </label>
                <div class="flex flex-wrap gap-3">
                  <button
                    v-for="color in availableColors"
                    :key="color"
                    @click="selectedColor = color"
                    class="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 flex items-center justify-center"
                    :class="selectedColor === color ? 'border-primary-500' : 'border-gray-300'"
                  >
                    <span class="w-6 sm:w-8 h-6 sm:h-8 rounded-full" :style="{ backgroundColor: color }"></span>
                  </button>
                </div>
              </div>

              <!-- Storage Selection -->
              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {{ $t('product.select_storage') }}
                </label>
                <div class="flex flex-wrap gap-3">
                  <button
                    v-for="size in availableSizes"
                    :key="size"
                    @click="selectedSize = size"
                    class="px-3 sm:px-4 py-2 rounded-lg border-2 text-sm sm:text-base"
                    :class="selectedSize === size ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-300 hover:border-gray-400'"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>

              <!-- Quantity -->
              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {{ $t('product.quantity') }}
                </label>
                <div class="flex items-center space-x-3">
                  <button
                    @click="quantity > 1 && quantity--"
                    class="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:border-primary-500"
                    :disabled="quantity <= 1"
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                  <span class="w-12 text-center text-lg font-medium">{{ quantity }}</span>
                  <button
                    @click="quantity++"
                    class="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:border-primary-500"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>

              <!-- Add to Cart Button -->
              <button
                @click="addToCart"
                class="w-full py-3 px-8 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors"
                :disabled="!selectedColor || !selectedSize"
              >
                {{ $t('product.add_to_cart') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const props = defineProps({
  show: Boolean,
  product: Object
})

const emit = defineEmits(['close', 'added-to-cart'])

const cartStore = useCartStore()
const selectedImage = ref('')
const selectedColor = ref(null)
const selectedSize = ref(null)
const quantity = ref(1)

// Available variants
const availableColors = computed(() => {
  return [...new Set(props.product?.variants?.map(v => v.attribute_values.Color) || [])]
})

const availableSizes = computed(() => {
  return [...new Set(props.product?.variants?.map(v => v.attribute_values.Storage) || [])]
})

// Selected variant
const selectedVariant = computed(() => {
  if (!selectedColor.value || !selectedSize.value) return null
  
  return props.product?.variants?.find(v => 
    v.attribute_values.Color === selectedColor.value && 
    v.attribute_values.Storage === selectedSize.value
  )
})

// Reset selections when modal is opened
watch(() => props.show, (newVal) => {
  if (newVal) {
    selectedImage.value = props.product?.images[0] || ''
    selectedColor.value = null
    selectedSize.value = null
    quantity.value = 1
  }
})

// Methods
const close = () => {
  emit('close')
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price)
}

const addToCart = () => {
  if (!selectedVariant.value) return

  const cartItem = {
    id: selectedVariant.value.id,
    productId: props.product.id,
    name: props.product.name,
    price: selectedVariant.value.price,
    oldPrice: selectedVariant.value.price * 1.2,
    color: selectedColor.value,
    size: selectedSize.value,
    quantity: quantity.value,
    image: selectedImage.value || props.product.images[0],
    variant: selectedVariant.value,
    attributes: {
      color: selectedColor.value,
      storage: selectedSize.value
    }
  }

  cartStore.addToCart(cartItem)
  emit('added-to-cart')
  close()
}
</script>

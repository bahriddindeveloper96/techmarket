<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Empty state -->
    <div v-if="favoriteStore.items.length === 0" class="text-center py-12">
      <div class="flex flex-col items-center justify-center gap-4 py-12">
        <i class="ri-heart-line text-6xl text-gray-400 dark:text-gray-600"></i>
        <h2 class="text-2xl font-medium text-gray-900 dark:text-white">
          {{ $t('favorites.empty_title') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          {{ $t('favorites.empty_description') }}
        </p>
        <router-link
          to="/"
          class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-purple-100 dark:shadow-purple-900/30 hover:shadow-xl hover:shadow-purple-200 dark:hover:shadow-purple-900/40 transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <i class="ri-shopping-bag-line"></i>
          {{ $t('favorites.browse_catalog') }}
        </router-link>
      </div>
    </div>

    <template v-else>
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <i class="ri-heart-line"></i>
          {{ $t('favorites.title') }}
          <!-- <span class="text-sm font-normal text-gray-600 dark:text-gray-400">
            ({{ favoriteStore.count }} {{ $t('favorites.items') }})
          </span> -->
        </h1>
        <button
          @click="favoriteStore.clearFavorites"
          class="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          <i class="ri-delete-bin-line mr-1"></i>
          {{ $t('favorites.clear_all') }}
        </button>
      </div>

      <!-- Image Slider -->
      <div class="mb-8">
        <swiper
          :modules="[Autoplay, EffectFade, Navigation, Pagination]"
          :slides-per-view="1"
          :loop="true"
          :effect="'fade'"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false
          }"
          :navigation="true"
          :pagination="{
            clickable: true,
            dynamicBullets: true
          }"
          class="w-full h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800"
        >
          <swiper-slide v-for="item in favoriteStore.items" :key="item.id" class="relative">
            <div class="absolute inset-0 flex items-center justify-center p-8">
              <img 
                :src="item.mainImage"
                :alt="item.name"
                class="max-w-full max-h-full object-contain"
                @error="handleImageError"
              />
            </div>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
              <h3 class="text-white text-xl font-medium mb-2">{{ item.name }}</h3>
              <p class="text-white/80">{{ item.category }}</p>
              <div class="flex items-center justify-between mt-4">
                <span class="text-white text-lg font-medium">{{ formatPrice(item.price) }}</span>
                <button
                  @click="removeFromFavorites(item.id)"
                  class="text-white/80 hover:text-red-400 transition-colors"
                >
                  <i class="ri-heart-fill"></i>
                </button>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="item in favoriteStore.items"
          :key="item.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden"
        >
          <div class="relative aspect-square">
            <img
              :src="item.mainImage"
              :alt="item.name"
              class="absolute inset-0 w-full h-full object-cover"
              @error="handleImageError"
            />
          </div>
          <div class="p-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {{ item.name }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {{ item.category }}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-lg font-medium text-gray-900 dark:text-white">
                {{ formatPrice(item.price) }}
              </span>
              <div class="flex items-center gap-2">
                <!-- <button
                  @click="openProductModal(item)"
                  class="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                >
                  <i class="ri-info-line"></i>
                </button> -->
                <button
                  @click="openProductModal(item)"
                  class="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                >
                  <i class="ri-shopping-cart-2-line"></i>
                </button>
                <button
                  @click="removeFromFavorites(item.id)"
                  class="p-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                >
                  <i class="ri-heart-fill"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>

  <ProductDetailModal
    :show="showProductModal"
    :product="selectedProduct"
    @close="closeProductModal"
    @added-to-cart="onAddedToCart"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useCartStore } from '@/stores/cartStore'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import ProductDetailModal from '@/components/ProductDetailModal.vue'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const { t } = useI18n()
const favoriteStore = useFavoriteStore()
const cartStore = useCartStore()
const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://eragon.uz"
const token = "2|Yz4cT4P7rJJND86WgT5OhAQDG8E9k3l7NzcLaGDLb6810987"
const debug = ref(false)

// Modal state
const showProductModal = ref(false)
const selectedProduct = ref(null)

// Format price
const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0
  }).format(price)
}

// Handle image error
const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/400x400?text=No+Image'
}

// Open product modal
const openProductModal = async (item) => {
  try {
    // Fetch full product details
    const response = await axios.get(
      `${baseUrl}/api/products/${item.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    )
    
    if (response.data.message === "Product retrieved successfully") {
      const productData = response.data.data.data
      selectedProduct.value = {
        ...productData,
        mainImage: item.mainImage,
        images: item.images,
        price: productData.variants?.[0]?.price || 0,
        variants: productData.variants || []
      }
      showProductModal.value = true
    }
  } catch (error) {
    console.error("Error fetching product details:", error)
  }
}

// Close product modal
const closeProductModal = () => {
  showProductModal.value = false
  selectedProduct.value = null
}

// Handle added to cart event
const onAddedToCart = () => {
  closeProductModal()
}

// Add to cart
const addToCart = (item) => {
  cartStore.addToCart({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: 1,
    image: item.mainImage,
    variant: {
      id: item.id,
      product_id: item.id
    }
  })
}

// Remove from favorites
const removeFromFavorites = (itemId) => {
  favoriteStore.removeFromFavorites(itemId)
}

// Load product details for each favorite item
const loadProductDetails = async () => {
  try {
    console.log("Loading product details for items:", favoriteStore.items)
    for (let item of favoriteStore.items) {
      console.log("Processing item:", item)
      const response = await axios.get(
        `${baseUrl}/api/products/${item.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      console.log("API Response:", response.data)
      if (response.data.message === "Product retrieved successfully") {
        const productData = response.data.data.data
        console.log("Product data:", productData)
        
        // Update item with new data
        const images = productData.variants?.[0]?.images ||
          productData.images?.map((img) => img.image) ||
          []
          
        const mainImage = images[0] || 'https://via.placeholder.com/400x400?text=No+Image'
        
        Object.assign(item, {
          name: productData.name,
          category: productData.category?.name,
          price: productData.variants?.[0]?.price || 0,
          images: images,
          image_url: mainImage,
          mainImage: mainImage
        })
        
        console.log("Updated item:", item)
      }
    }
    console.log("Final items state:", favoriteStore.items)
  } catch (error) {
    console.error("Error loading product details:", error)
  }
}

// Load product details when component is mounted
onMounted(async () => {
  await loadProductDetails()
})
</script>

<style>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-button-next,
.swiper-button-prev {
  color: white !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.swiper-pagination-bullet {
  background: white !important;
  opacity: 0.7;
}

.swiper-pagination-bullet-active {
  opacity: 1;
  background: white !important;
}

@media (max-width: 640px) {
  .swiper-button-next,
  .swiper-button-prev {
    display: none !important;
  }
}
</style>

<template>
  <main class="py-4 pb-[60px] md:pb-4">      
      <!-- Cart Header -->
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent dark:text-white">
          {{ $t('cart.title') }}
        </h1>
        <button v-if="cartItems.length" @click="clearCart" class="text-xs md:text-sm text-red-500 hover:text-red-600 transition-colors dark:text-red-400 dark:hover:text-red-300">
          {{ $t('cart.clear_cart') }}
        </button>
      </div>

      <!-- Empty Cart -->
      <div v-if="!cartItems.length" class="text-center py-6 md:py-8">
        <div class="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 text-gray-300 dark:text-gray-600">
          <i class="fas fa-shopping-cart text-5xl md:text-6xl"></i>
        </div>
        <h2 class="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-400 mb-4">{{ $t('cart.empty') }}</h2>
        <router-link to="/" class="inline-block bg-purple-600 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors dark:bg-purple-500 dark:hover:bg-purple-600">
          {{ $t('cart.continue_shopping') }}
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-4">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-2 md:space-y-4">
          <div v-for="item in cartItems" :key="item.id" 
            class="flex items-center gap-2 md:gap-4 bg-white dark:bg-gray-900 p-3 md:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <!-- Product Image -->
            <img :src="item.image" :alt="item.name" class="w-16 h-16 md:w-24 md:h-24 object-cover rounded-lg">
            
            <!-- Product Info -->
            <div class="flex-1">
              <h3 class="text-sm md:text-base font-medium text-gray-900 dark:text-white">{{ item.name }}</h3>
              <div class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span class="mr-2">
                  <i class="fas fa-circle" :style="{ color: item.attributes.color }"></i>
                  {{ item.attributes.color }}
                </span>
                <span>{{ item.attributes.storage }}</span>
              </div>
              <div class="mt-2 flex items-center gap-2 md:gap-4">
                <span class="text-sm md:text-base font-medium text-gray-900 dark:text-white">{{ formatPrice(item.price) }} {{ $t('currency') }}</span>
                <span v-if="item.oldPrice" class="text-xs md:text-sm line-through text-gray-400">
                  {{ formatPrice(item.oldPrice) }} {{ $t('currency') }}
                </span>
              </div>
            </div>

            <!-- Quantity Controls -->
            <div class="flex items-center gap-1 md:gap-2">
              <button 
                @click="updateQuantity(item, -1)"
                class="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-lg border hover:border-purple-500 transition-colors dark:border-gray-700 dark:hover:border-purple-400"
                :disabled="item.quantity <= 1"
              >
                <i class="fas fa-minus text-xs md:text-sm text-gray-600 dark:text-gray-400"></i>
              </button>
              <span class="w-6 md:w-8 text-center text-sm md:text-base text-gray-900 dark:text-white">{{ item.quantity }}</span>
              <button 
                @click="updateQuantity(item, 1)"
                class="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-lg border hover:border-purple-500 transition-colors dark:border-gray-700 dark:hover:border-purple-400"
              >
                <i class="fas fa-plus text-xs md:text-sm text-gray-600 dark:text-gray-400"></i>
              </button>
            </div>

            <!-- Actions -->
            <div class="flex gap-2">
              <button 
                @click="removeFromCart(item)"
                class="text-gray-400 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400"
                :title="$t('cart.remove')"
              >
                <i class="fas fa-trash text-sm md:text-base"></i>
              </button>
            </div>
          </div>

          <!-- Clear Cart -->
          <button 
            @click="clearCart"
            class="text-xs md:text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            {{ $t('cart.clear_cart') }}
          </button>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-xl shadow-sm">
            <h2 class="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-4">{{ $t('cart.total') }}</h2>
            
            <!-- Items Count -->
            <div class="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-4">
              {{ cartItems.length }} {{ $t('cart.total_items') }}
            </div>

            <!-- Subtotal -->
            <div class="flex justify-between py-2 border-t dark:border-gray-800">
              <span class="text-sm md:text-base text-gray-600 dark:text-gray-400">{{ $t('cart.subtotal') }}</span>
              <span class="text-sm md:text-base font-medium text-gray-900 dark:text-white">{{ formatPrice(subtotal) }} {{ $t('currency') }}</span>
            </div>

            <!-- Shipping -->
            <div class="flex justify-between py-2 border-t dark:border-gray-800">
              <span class="text-sm md:text-base text-gray-600 dark:text-gray-400">{{ $t('cart.shipping') }}</span>
              <span class="text-sm md:text-base text-green-500 dark:text-green-400">{{ $t('cart.free') }}</span>
            </div>

            <!-- Total -->
            <div class="flex justify-between py-2 border-t border-b dark:border-gray-800">
              <span class="text-sm md:text-base font-medium text-gray-900 dark:text-white">{{ $t('cart.total') }}</span>
              <span class="text-sm md:text-base font-bold text-gray-900 dark:text-white">{{ formatPrice(subtotal) }} {{ $t('currency') }}</span>
            </div>

            <!-- Checkout Button -->
            <button 
              @click="checkout"
              class="w-full mt-4 md:mt-6 bg-purple-600 text-white text-sm md:text-base py-2 rounded-lg hover:bg-purple-700 transition-colors dark:bg-purple-500 dark:hover:bg-purple-600"
            >
              {{ $t('cart.checkout') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Similar Products -->
      <div class="mt-2 px-2 md:px-0">
        <h2 class="text-lg md:text-xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent dark:text-white">
          {{ $t('cart.similar_products') }}
        </h2>
        <Swiper
          :modules="[Autoplay, Pagination, Navigation]"
          :slides-per-view="2"
          :space-between="8"
          :navigation="true"
          :pagination="{ clickable: true }"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          class="similar-products-swiper"
          :breakpoints="{
            '768': {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            '1024': {
              slidesPerView: 5,
              spaceBetween: 16,
            },
          }"
        >
          <SwiperSlide v-for="product in similarProducts" :key="product.id">
            <ProductCard :product="product" />
          </SwiperSlide>
        </Swiper>
      </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import ProductCard from '@/components/ProductCard.vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

const { t } = useI18n()
const router = useRouter()
const cartStore = useCartStore()

// Get cart items from store
const cartItems = computed(() => cartStore.items || [])
const subtotal = computed(() => cartStore.total || 0)

// Similar products
const similarProducts = ref([])
const loading = ref(false)

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = import.meta.env.VITE_API_BASE_token;
// Fetch similar products
const fetchSimilarProducts = async () => {
  try {
    loading.value = true;
    console.log('Fetching similar products from:', `${baseUrl}/api/homepage`);
    
    const response = await axios.get(
      `${baseUrl}/api/homepage`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    console.log('API Response:', response.data);

    if (response.data?.success && response.data?.data?.featured_products) {
      similarProducts.value = response.data.data.featured_products.map(product => {
        const defaultVariant = product.variants?.[0];
        return {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: defaultVariant?.price || 0,
          oldPrice: null,
          stock: defaultVariant?.stock || 0,
          rating: product.average_rating || 0,
          reviews: 0,
          isFavorite: product.favorite_count > 0,
          installment: true,
          images: defaultVariant?.images ||
            product.images?.map((img) => img.image) || [
              product.category?.image ||
                "https://picsum.photos/400/400?random=1",
            ],
          image: defaultVariant?.images?.[0] ||
            product.images?.[0]?.image ||
            product.category?.image ||
            "https://picsum.photos/400/400?random=1",
        };
      });
    } else {
      console.error('Invalid API response structure:', response.data);
      similarProducts.value = [];
    }
  } catch (error) {
    console.error('Error fetching similar products:', error.response?.data || error.message);
    similarProducts.value = [];
  } finally {
    loading.value = false;
  }
};

// Computed total price
const totalPrice = computed(() => {
  return cartStore.items.reduce((total, item) => total + item.price * item.quantity, 0)
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price)
}

const updateQuantity = (item, change) => {
  cartStore.updateQuantity(item.id, item.quantity + change)
}

const removeFromCart = (item) => {
  cartStore.removeFromCart(item.id)
}

const clearCart = () => {
  cartStore.clearCart()
}

const checkout = () => {
  router.push('/checkout')
}

// Fetch similar products on mount
onMounted(() => {
  fetchSimilarProducts()
})
</script>
<style>
@import '@/assets/main.css';
@import 'swiper/css';
@import 'swiper/css/navigation';
@import 'swiper/css/pagination';

.similar-products-swiper {
  padding: 10px 0 30px 0;
  position: relative;
}

/* Mobile styles (default) */
.similar-products-swiper .swiper-button-next,
.similar-products-swiper .swiper-button-prev {
  display: none;
}

.similar-products-swiper .swiper-pagination {
  bottom: 0;
}

.similar-products-swiper .swiper-pagination-bullet {
  width: 6px;
  height: 6px;
  margin: 0 4px;
  background: #e2e8f0;
  opacity: 1;
  transition: all 0.3s ease;
}

.similar-products-swiper .swiper-pagination-bullet-active {
  background: #6b46c1;
  width: 18px;
  border-radius: 3px;
}

.similar-products-swiper .swiper-slide {
  height: auto;
  padding: 0 4px;
}

/* Tablet and Desktop styles */
@media (min-width: 768px) {
  .similar-products-swiper {
    padding: 20px 40px 40px;
  }

  .similar-products-swiper .swiper-slide {
    padding: 0;
  }

  .similar-products-swiper .swiper-button-next,
  .similar-products-swiper .swiper-button-prev {
    display: flex;
    width: 40px;
    height: 40px;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .similar-products-swiper .swiper-button-next:hover,
  .similar-products-swiper .swiper-button-prev:hover {
    background-color: #6b46c1;
  }

  .similar-products-swiper .swiper-button-next::after,
  .similar-products-swiper .swiper-button-prev::after {
    font-size: 16px;
    color: #6b46c1;
    font-weight: bold;
    transition: all 0.3s ease;
  }

  .similar-products-swiper .swiper-button-next:hover::after,
  .similar-products-swiper .swiper-button-prev:hover::after {
    color: white;
  }

  .similar-products-swiper .swiper-pagination {
    bottom: 10px;
  }

  .similar-products-swiper .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    margin: 0 6px;
  }

  .similar-products-swiper .swiper-pagination-bullet-active {
    width: 24px;
    border-radius: 4px;
  }

  .similar-products-swiper .swiper-slide:hover {
    transform: translateY(-5px);
  }
}

/* Dark mode styles */
.dark .similar-products-swiper .swiper-button-next,
.dark .similar-products-swiper .swiper-button-prev {
  background-color: #1a1a1a;
}

.dark .similar-products-swiper .swiper-button-next:hover,
.dark .similar-products-swiper .swiper-button-prev:hover {
  background-color: #6b46c1;
}

.dark .similar-products-swiper .swiper-pagination-bullet {
  background: #4a5568;
}

.dark .similar-products-swiper .swiper-pagination-bullet-active {
  background: #6b46c1;
}
</style>

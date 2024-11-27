<template>
  <main class="flex-grow flex justify-center items-start py-8">
    <div class="container mx-auto px-4 max-w-7xl w-full">
    <!-- Banner Section -->
      <div class="mb-12">
        <CategoryBanner />
      </div>
      <div class="mb-12">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <router-link to="/" class="text-gray-700 hover:text-blue-600">
                Bosh sahifa
              </router-link>
            </li>
            <li>
              <div class="flex items-center">
                <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span class="text-gray-500">{{ category.name }}</span>
              </div>
            </li>
          </ol>
        </nav> 
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Filters Sidebar -->
          <div class="w-full md:w-1/4">
            <FilterSidebar @apply-filters="handleFilters" />
          </div>

          <!-- Products Grid -->
          <div class="w-full md:w-3/4">
          <!-- Sort Options -->
          <div class="bg-white rounded-lg shadow p-4 mb-6 flex justify-between items-center">
            <h1 class="text-xl font-bold">{{ category.name }}</h1>
            <select v-model="sortBy" class="border rounded-md px-3 py-2">
              <option value="popular">Ommabop</option>
              <option value="price_asc">Narx: Arzondan qimmatga</option>
              <option value="price_desc">Narx: Qimmatdan arzonga</option>
              <option value="new">Yangi</option>
            </select>
          </div>

          <!-- Products Grid -->
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="product in products" :key="product.id" 
              class="bg-white rounded-lg shadow-sm overflow-hidden">
              <router-link :to="'/product/' + product.id" class="block">
                <!-- Product Image -->
                <div class="relative aspect-[3/4] overflow-hidden bg-white">
                  <img 
                    :src="product.image" 
                    :alt="product.name"
                    class="w-full h-full object-cover"
                  />
                  <!-- Favorite Button -->
                  <button 
                    @click.stop="toggleFavorite(product)"
                    class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-all duration-300 group/fav"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      class="h-5 w-5 transition-all duration-300"
                      :class="[
                        product.isFavorite 
                          ? 'text-red-500 scale-110 fill-red-500' 
                          : 'text-gray-400 group-hover/fav:text-red-500 group-hover/fav:scale-110'
                      ]"
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      :stroke-width="product.isFavorite ? 0 : 2"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                      />
                    </svg>
                  </button>
                </div>

                <!-- Product Info -->
                <div class="p-3 space-y-2">
                  <!-- Title -->
                  <h3 class="font-medium text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors duration-300">
                    {{ product.name }}
                  </h3>

                  <!-- Price -->
                  <div class="space-y-1">
                    <p v-if="product.discount" class="text-sm text-gray-500">
                      <span class="line-through">{{ product.originalPrice.toLocaleString() }} so'm</span>
                      <span class="ml-2 text-xs px-1.5 py-0.5 bg-red-100 text-red-600 rounded">
                        -{{ Math.floor((product.originalPrice - product.price) / product.originalPrice * 100) }}%
                      </span>
                    </p>
                    <p class="text-lg font-semibold text-gray-900">
                      {{ product.price.toLocaleString() }} so'm
                    </p>
                  </div>

                  <!-- Monthly Payment -->
                  <div v-if="product.installment" class="bg-gray-50 -mx-3 px-3 py-2">
                    <p class="text-sm text-gray-600">
                      <span class="font-medium text-gray-900">{{ Math.round(product.price / 12).toLocaleString() }} so'm</span>
                      x 12 oy
                    </p>
                  </div>
                </div>
              </router-link>

              <!-- Cart Button -->
              <div class="p-3">
                <button @click="addToCart(product)" 
                  class="w-full py-2 bg-black hover:bg-gray-900 text-white rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Savatga</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="flex justify-center mt-8">
            <nav class="flex items-center gap-2">
              <button 
                :disabled="currentPage === 1"
                @click="changePage(currentPage - 1)"
                class="px-3 py-1 rounded border"
                :class="currentPage === 1 ? 'text-gray-400' : 'hover:bg-gray-100'">
                &lt;
              </button>
              <button 
                v-for="page in totalPages" 
                :key="page"
                @click="changePage(page)"
                class="px-3 py-1 rounded border"
                :class="currentPage === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'">
                {{ page }}
              </button>
              <button 
                :disabled="currentPage === totalPages"
                @click="changePage(currentPage + 1)"
                class="px-3 py-1 rounded border"
                :class="currentPage === totalPages ? 'text-gray-400' : 'hover:bg-gray-100'">
                &gt;
              </button>
            </nav>
          </div>
        </div>
      </div>
      </div>
      
    </div>
  </main>
  
</template>

<script setup>
import { ref } from 'vue'
import CategoryBanner from './../components/CategoryBanner.vue'
import FilterSidebar from './../components/FilterSidebar.vue'

// Methods
const addToCart = (product) => {
  console.log('Adding to cart:', product)
  // Add cart logic here
}

const toggleFavorite = (product) => {
  product.isFavorite = !product.isFavorite
}

const handleFilters = (filters) => {
  console.log('Filters applied:', filters)
  // Apply filters logic here
}
</script>
<script>
export default {
  name: 'CategoryView',
  data() {
    return {
      category: {
        id: 1,
        name: 'Smartfonlar'
      },
      products: [
        {
          id: 1,
          name: 'iPhone 13 Pro Max',
          price: 12000000,
          originalPrice: 13000000,
          image: 'https://picsum.photos/400/500',
          discount: true,
          installment: true,
          isFavorite: false
        },
        {
          id: 2,
          name: 'Samsung Galaxy S21 Ultra',
          price: 11000000,
          originalPrice: 12000000,
          image: 'https://picsum.photos/300/300',
          discount: true,
          installment: true,
          isFavorite: false
        },
        {
          id: 3,
          name: 'Xiaomi Mi 11',
          price: 8000000,
          originalPrice: 9000000,
          image: 'https://picsum.photos/300/300',
          discount: true,
          installment: true,
          isFavorite: false
        },
        {
          id: 4,
          name: 'Huawei P40 Pro',
          price: 9000000,
          originalPrice: 10000000,
          image: 'https://picsum.photos/300/300',
          discount: true,
          installment: true,
          isFavorite: false
        }
      ],
      brands: [
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Samsung' },
        { id: 3, name: 'Xiaomi' },
        { id: 4, name: 'Huawei' }
      ],
      colors: [
        { id: 1, name: 'Qizil', class: 'bg-red-500' },
        { id: 2, name: 'Kulrang', class: 'bg-gray-500' },
        { id: 3, name: 'Yashil', class: 'bg-green-500' },
        { id: 4, name: "Ko'k", class: 'bg-blue-500' },
        { id: 5, name: 'Sariq', class: 'bg-yellow-500' },
        { id: 6, name: 'Jigarrang', class: 'bg-purple-500' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      filters: {
        minPrice: '',
        maxPrice: '',
        brands: [],
        colors: [],
        sizes: []
      },
      sortBy: 'popular',
      currentPage: 1,
      totalPages: 5
    }
  },
  methods: {
    async fetchCategory() {
      // TODO: Implement API call to fetch category details
      this.category = {
        id: this.$route.params.id,
        name: 'Smartfonlar'
      }
    },
    async fetchProducts() {
      // TODO: Implement API call to fetch products
      // This is sample data
      this.products = [
        {
          id: 1,
          name: 'iPhone 13 Pro Max',
          price: 12000000,
          originalPrice: 13000000,
          image: 'https://picsum.photos/400/500',
          discount: true,
          installment: true,
          isFavorite: false
        },
        {
          id: 2,
          name: 'Samsung Galaxy S21 Ultra',
          price: 11000000,
          originalPrice: 12000000,
          image: 'https://picsum.photos/300/300',
          discount: true,
          installment: true,
          isFavorite: false
        },
        {
          id: 3,
          name: 'Xiaomi Mi 11',
          price: 8000000,
          originalPrice: 9000000,
          image: 'https://picsum.photos/300/300',
          discount: true,
          installment: true,
          isFavorite: false
        },
        {
          id: 4,
          name: 'Huawei P40 Pro',
          price: 9000000,
          originalPrice: 10000000,
          image: 'https://picsum.photos/300/300',
          discount: true,
          installment: true,
          isFavorite: false
        }
      ]
    },
    applyFilters() {
      this.fetchProducts()
    },
    changePage(page) {
      this.currentPage = page
      this.fetchProducts()
    }
  },
  watch: {
    sortBy() {
      this.fetchProducts()
    },
    '$route.params.id': {
      handler() {
        this.fetchCategory()
        this.fetchProducts()
      },
      immediate: true
    }
  }
}
</script>

<style>
@import '@/assets/main.css';

/* Global styles */
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: rgb(249, 250, 251);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}
</style>
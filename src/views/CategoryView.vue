<template>
  <main class="py-4">
      <!-- Breadcrumb -->
      <div class="mb-4 sm:mb-4">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3 text-sm">
            <li class="inline-flex items-center">
              <router-link to="/" class="text-gray-700 hover:text-primary-600">
                {{ $t('nav.home') }}
              </router-link>
            </li>
            <li>
              <div class="flex items-center">
                <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span class="text-gray-500">{{ $t(`${category.name.toLowerCase()}`) }}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <!-- Main Content -->
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Filters Sidebar -->
        <div class="w-full lg:w-1/4 lg:sticky lg:top-4">
          <FilterSidebar @apply-filters="handleFilters" />
        </div>

        <!-- Products Section -->
        <div class="w-full lg:w-3/4">
          <!-- Sort Options -->
          <div class="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 class="text-lg sm:text-xl font-semibold text-gray-900">{{ $t(`${category.name.toLowerCase()}`) }}</h1>
              <div class="flex items-center gap-2 w-full sm:w-auto">
                <select v-model="sortBy" class="w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="popular">{{ $t('category.sort.popular') }}</option>
                  <option value="price_asc">{{ $t('category.sort.price_low') }}</option>
                  <option value="price_desc">{{ $t('category.sort.price_high') }}</option>
                  <option value="new">{{ $t('category.sort.newest') }}</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Products Grid -->
          <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            <ProductCard 
              v-for="product in products" 
              :key="product.id"
              :product="product"
              @add-to-cart="addToCart"
              @toggle-favorite="toggleFavorite"
            />
          </div>

          <!-- Pagination -->
          <div class="flex justify-center mt-4">
            <nav class="flex items-center gap-1 sm:gap-2">
              <button 
                :disabled="currentPage === 1"
                @click="changePage(currentPage - 1)"
                class="px-3 py-1 sm:px-4 sm:py-2 rounded-lg border text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                {{ $t('category.pagination.prev') }}
              </button>
              <button 
                v-for="page in totalPages" 
                :key="page"
                @click="changePage(page)"
                :class="[
                  'px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm font-medium',
                  currentPage === page 
                    ? 'bg-primary-600 text-white' 
                    : 'border hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              <button 
                :disabled="currentPage === totalPages"
                @click="changePage(currentPage + 1)"
                class="px-3 py-1 sm:px-4 sm:py-2 rounded-lg border text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                {{ $t('category.pagination.next') }}
              </button>
            </nav>
          </div>
        </div>
      </div>
    
  </main>
</template>

<script setup>
import { ref } from 'vue'
import FilterSidebar from '../components/FilterSidebar.vue'
import ProductCard from '../components/ProductCard.vue'

const category = ref({
  id: 1,
  name: 'Smartfonlar'
})

const products = ref([
  {
    id: 1,
    name: 'iPhone 13 Pro Max',
    price: 13_999_000,
    oldPrice: 15_999_000,
    rating: 4.8,
    reviews: 245,
    isFavorite: false,
    installment: true,
    images: [
      'https://picsum.photos/400/400?random=1',
      'https://picsum.photos/400/400?random=2',
      'https://picsum.photos/400/400?random=3'
    ]
  },
  {
    id: 2,
    name: 'Samsung Galaxy S21 Ultra',
    price: 12_999_000,
    oldPrice: 14_499_000,
    rating: 4.7,
    reviews: 189,
    isFavorite: false,
    installment: true,
    images: [
      'https://picsum.photos/400/400?random=4',
      'https://picsum.photos/400/400?random=5',
      'https://picsum.photos/400/400?random=6'
    ]
  },
  {
    id: 5,
    name: 'MacBook Pro 16"',
    price: 15_999_000,
    oldPrice: null,
    rating: 5.0,
    reviews: 87,
    isFavorite: false,
    installment: true,
    images: [
      'https://picsum.photos/400/400?random=1',
      'https://picsum.photos/400/400?random=8',
      'https://picsum.photos/400/400?random=7'
    ]
  },
  {
    id: 6,
    name: 'iPad Pro 10.9"',
    price: 10_999_000,
    oldPrice: 13_499_000,
    rating: 4.9,
    reviews: 156,
    isFavorite: false,
    installment: true,
    images: [
      'https://picsum.photos/400/400?random=15',
      'https://picsum.photos/400/400?random=11',
      'https://picsum.photos/400/400?random=14'
    ]
  },
  {
    id: 8,
    name: 'iPad Pro 10.9"',
    price: 10_999_000,
    oldPrice: 13_499_000,
    rating: 4.9,
    reviews: 156,
    isFavorite: false,
    installment: true,
    images: [
      'https://picsum.photos/400/400?random=15',
      'https://picsum.photos/400/400?random=11',
      'https://picsum.photos/400/400?random=14'
    ]
  }
])

const sortBy = ref('popular')
const currentPage = ref(1)
const totalPages = ref(5)

const addToCart = (product) => {
  console.log('Adding to cart:', product)
}

const toggleFavorite = (product) => {
  product.isFavorite = !product.isFavorite
}

const handleFilters = (filters) => {
  console.log('Filters applied:', filters)
}

const changePage = (page) => {
  currentPage.value = page
}
</script>

<script>
export default {
  name: 'CategoryView',
  data() {
    return {
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
      }
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

<style>
@media screen and (max-width: 480px) {
  .text-lg {
    font-size: 14px !important;
  }
  
  .text-sm {
    font-size: 12px !important;
  }
  
  .text-xs {
    font-size: 10px !important;
  }
}
</style>
<template>
  <main class="py-4">
    <!-- Banner Section -->
    <div class="mb-4">
      <Banner />
    </div>
    <!-- Popular Products -->
    <div class="mb-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">{{ $t('home.popular_products') }}</h2>       
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <ProductCard 
          v-for="product in popularProducts" 
          :key="product.id"
          :product="product"
        />
      </div>
    </div>

    <!-- New Products -->
    <div class="mb-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">{{ $t('home.new_products') }}</h2>       
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <ProductCard 
          v-for="product in newProducts" 
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Banner from './../components/Banner.vue'
import CategoryCard from './../components/CategoryCard.vue'
import ProductCard from './../components/ProductCard.vue'

const { t } = useI18n()

// Sample data
const categories = ref([
  {
    id: 1,
    name: t('categories.electronics'),
    image: 'https://picsum.photos/200?random=1'
  },
  {
    id: 2,
    name: t('categories.appliances'),
    image: 'https://picsum.photos/200?random=2'
  },
  {
    id: 3,
    name: t('categories.clothing'),
    image: 'https://picsum.photos/200?random=3'
  },
  {
    id: 4,
    name: t('categories.footwear'),
    image: 'https://picsum.photos/200?random=4'
  },
  {
    id: 5,
    name: t('categories.accessories'),
    image: 'https://picsum.photos/200?random=5'
  },
  {
    id: 6,
    name: t('categories.beauty'),
    image: 'https://picsum.photos/200?random=6'
  }
])

const popularProducts = ref([
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

const newProducts = ref([
  {
    id: 3,
    name: 'MacBook Pro 14"',
    price: 18_999_000,
    oldPrice: null,
    rating: 5.0,
    reviews: 87,
    isFavorite: false,
    installment: true,
    images: [
      'https://picsum.photos/400/400?random=7',
      'https://picsum.photos/400/400?random=8',
      'https://picsum.photos/400/400?random=9'
    ]
  },
  {
    id: 4,
    name: 'iPad Pro 12.9"',
    price: 11_999_000,
    oldPrice: 13_499_000,
    rating: 4.9,
    reviews: 156,
    isFavorite: false,
    installment: true,
    images: [
      'https://picsum.photos/400/400?random=10',
      'https://picsum.photos/400/400?random=11',
      'https://picsum.photos/400/400?random=12'
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
    id: 7,
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
  }
  
])

// Methods
const addToCart = (product) => {
  console.log('Adding to cart:', product)
  // Add cart logic here
}

const toggleFavorite = (product) => {
  product.isFavorite = !product.isFavorite
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
</style>
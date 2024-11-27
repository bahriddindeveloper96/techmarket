<template>
  <main class="flex-grow flex justify-center items-start py-8">
    <div class="container mx-auto px-4 max-w-7xl w-full">
    <!-- Banner Section -->
      <div class="mb-12">
        <Banner />
      </div>
      <!-- Popular Products -->
      <div class="mb-12">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Ommabop mahsulotlar</h2>
          <a href="#" class="text-purple-600 hover:text-purple-700 font-medium">Barchasini ko'rish</a>
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
      <div class="mb-12">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Yangi mahsulotlar</h2>
          <a href="#" class="text-purple-600 hover:text-purple-700 font-medium">Barchasini ko'rish</a>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <ProductCard 
            v-for="product in newProducts" 
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
  </div>
  </main>
  
</template>

<script setup>
import { ref } from 'vue'
import Banner from './../components/Banner.vue'
import CategoryCard from './../components/CategoryCard.vue'
import ProductCard from './../components/ProductCard.vue'

// Sample data
const categories = ref([
  {
    id: 1,
    name: 'Elektronika',
    image: 'https://picsum.photos/200?random=1'
  },
  {
    id: 2,
    name: 'Maishiy texnika',
    image: 'https://picsum.photos/200?random=2'
  },
  {
    id: 3,
    name: 'Kiyimlar',
    image: 'https://picsum.photos/200?random=3'
  },
  {
    id: 4,
    name: 'Poyabzallar',
    image: 'https://picsum.photos/200?random=4'
  },
  {
    id: 5,
    name: 'Aksessuarlar',
    image: 'https://picsum.photos/200?random=5'
  },
  {
    id: 6,
    name: 'Go\'zallik',
    image: 'https://picsum.photos/200?random=6'
  }
])

const popularProducts = ref([
  {
    id: 1,
    name: 'Apple iPhone 14 Pro 256GB Space Black',
    price: 15_000_000,
    oldPrice: 16_500_000,
    image: 'https://picsum.photos/400?random=1',
    rating: 4.8,
    reviews: 245,
    isFavorite: false
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23 Ultra 512GB Black',
    price: 13_500_000,
    oldPrice: 14_800_000,
    image: 'https://picsum.photos/400?random=2',
    rating: 4.7,
    reviews: 189,
    isFavorite: false
  },
  {
    id: 3,
    name: 'MacBook Pro 14" M2 Pro 512GB Space Gray',
    price: 25_000_000,
    oldPrice: 27_000_000,
    image: 'https://picsum.photos/400?random=3',
    rating: 4.9,
    reviews: 156,
    isFavorite: false
  },
  {
    id: 4,
    name: 'Sony PlayStation 5 Digital Edition',
    price: 7_500_000,
    oldPrice: 8_200_000,
    image: 'https://picsum.photos/400?random=4',
    rating: 4.8,
    reviews: 312,
    isFavorite: false
  },
  {
    id: 5,
    name: 'Apple Watch Series 8 45mm',
    price: 5_800_000,
    oldPrice: 6_500_000,
    image: 'https://picsum.photos/400?random=5',
    rating: 4.7,
    reviews: 178,
    isFavorite: false
  }
])

const newProducts = ref([
  {
    id: 6,
    name: 'Apple AirPods Pro 2nd Generation',
    price: 3_200_000,
    oldPrice: 3_500_000,
    image: 'https://picsum.photos/400?random=6',
    rating: 4.8,
    reviews: 134,
    isFavorite: false
  },
  {
    id: 7,
    name: 'Samsung Galaxy Tab S9 Ultra 256GB',
    price: 12_500_000,
    oldPrice: 13_800_000,
    image: 'https://picsum.photos/400?random=7',
    rating: 4.6,
    reviews: 89,
    isFavorite: false
  },
  {
    id: 8,
    name: 'DJI Mini 3 Pro Drone',
    price: 8_900_000,
    oldPrice: 9_500_000,
    image: 'https://picsum.photos/400?random=8',
    rating: 4.7,
    reviews: 67,
    isFavorite: false
  },
  {
    id: 9,
    name: 'Sony WH-1000XM5 Wireless Headphones',
    price: 4_800_000,
    oldPrice: 5_200_000,
    image: 'https://picsum.photos/400?random=9',
    rating: 4.8,
    reviews: 145,
    isFavorite: false
  },
  {
    id: 10,
    name: 'GoPro HERO11 Black',
    price: 6_300_000,
    oldPrice: 6_800_000,
    image: 'https://picsum.photos/400?random=10',
    rating: 4.7,
    reviews: 92,
    isFavorite: false
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

.container {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
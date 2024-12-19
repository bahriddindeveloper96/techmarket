<template>
  <div id="app-main" class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">    
    <div class="w-full md:container md:mx-auto">
      <Navbar class="w-full" />    
      <router-view></router-view>      
      <Footer class="mt-auto" />
    </div>

    <!-- Global Product Detail Modal -->
    <ProductDetailModal
      v-if="modalProduct"
      :show="!!modalProduct"
      :product="modalProduct"
      @close="closeProductModal"
      @added-to-cart="handleAddedToCart"
    />
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ProductDetailModal from './components/ProductDetailModal.vue'

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

// Modal state
const modalProduct = ref(null)

// Modal methods
const openProductModal = (product) => {
  modalProduct.value = product
}

const closeProductModal = () => {
  modalProduct.value = null
}

const handleAddedToCart = () => {
  closeProductModal()
  // Add notification logic here if needed
}

// Methods
const addToCart = (product) => {
  console.log('Adding to cart:', product)
  // Add cart logic here
}

const toggleFavorite = (product) => {
  product.isFavorite = !product.isFavorite
}

// Provide modal methods to child components
provide('openProductModal', openProductModal)
provide('closeProductModal', closeProductModal)

onMounted(() => {
  // Initialize theme from localStorage or system preference
  const theme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
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

#app-main {
  width: 1280px;
  max-width: 1280px;
  min-height: 100vh;
  
}

/* Container styles */
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .container {
    margin: 0 auto;
  }
}

/* Desktop uchun */
@media (min-width: 1024px) {
  #app-main {
    max-width: 1280px;
  }
}

/* Tablet uchun */
@media (min-width: 768px) and (max-width: 1023px) {
  #app-main {
    max-width: 100%;
  }
}

/* Mobile uchun */
@media (max-width: 767px) {
  #app-main {
    max-width: 100%;
  }
}

/* Yangi qo'shilgan global stillar */
* {
  box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6 {
  font-family: Arial, sans-serif;
  color: #333;
}

a {
  text-decoration: none;
  color: #337ab7;
}

a:hover {
  color: #23527c;
}

button {
  cursor: pointer;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50;
  color: #fff;
}

/* button:hover {
  background-color: #3e8e41;
} */
</style>

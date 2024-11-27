<template>
  <div class="min-h-screen flex flex-col ">
    <Navbar class="w-full" /> 
        <router-view></router-view>
    <Footer class="w-full" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'


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

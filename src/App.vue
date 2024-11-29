<template>
  <div class="min-h-screen flex flex-col">
    <Navbar class="w-full" />
    <div class="flex-1 pb-[72px] md:pb-0">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <router-view></router-view>
      </div>
    </div>
    <Footer class="w-full" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
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

button:hover {
  background-color: #3e8e41;
}
</style>

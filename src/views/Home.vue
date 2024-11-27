<template>
  <div class="w-full">
    <!-- Banner Section -->
    <div class="mb-12">
      <Banner />
    </div>

    <!-- Categories Section -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold mb-6">Kategoriyalar</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <CategoryCard 
          v-for="category in categories" 
          :key="category.id"
          :category="category"
        />
      </div>
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
</template>

<script setup>
import Banner from '../components/Banner.vue'
import CategoryCard from '../components/CategoryCard.vue'
import ProductCard from '../components/ProductCard.vue'

const categories = [
  {
    id: 1,
    name: 'Elektronika',
    image: 'electronics.jpg',
    productCount: 1200
  },
  {
    id: 2,
    name: 'Kiyimlar',
    image: 'fashion.jpg',
    productCount: 2500
  },
  {
    id: 3,
    name: 'Poyabzallar',
    image: 'shoes.jpg',
    productCount: 800
  },
  {
    id: 4,
    name: 'Go\'zallik',
    image: 'beauty.jpg',
    productCount: 1500
  },
  {
    id: 5,
    name: 'Sport',
    image: 'sports.jpg',
    productCount: 600
  },
  {
    id: 6,
    name: 'Uy-ro\'zg\'or',
    image: 'home.jpg',
    productCount: 1800
  }
]

const popularProducts = [
  {
    id: 1,
    name: 'iPhone 13 Pro',
    price: 12000000,
    monthlyPayment: 1200000,
    image: 'iphone.jpg',
    discount: 10
  },
  {
    id: 2,
    name: 'Samsung TV',
    price: 8000000,
    monthlyPayment: 800000,
    image: 'tv.jpg',
    discount: 15
  },
  {
    id: 3,
    name: 'MacBook Pro',
    price: 15000000,
    monthlyPayment: 1500000,
    image: 'macbook.jpg',
    discount: 5
  },
  {
    id: 4,
    name: 'AirPods Pro',
    price: 2500000,
    monthlyPayment: 250000,
    image: 'airpods.jpg',
    discount: 0
  },
  {
    id: 5,
    name: 'PlayStation 5',
    price: 7000000,
    monthlyPayment: 700000,
    image: 'ps5.jpg',
    discount: 8
  }
]

const newProducts = [
  {
    id: 6,
    name: 'iPad Air',
    price: 9000000,
    monthlyPayment: 900000,
    image: 'ipad.jpg',
    discount: 0
  },
  {
    id: 7,
    name: 'Galaxy Watch',
    price: 3000000,
    monthlyPayment: 300000,
    image: 'watch.jpg',
    discount: 12
  },
  {
    id: 8,
    name: 'Xiaomi Robot Vacuum',
    price: 4000000,
    monthlyPayment: 400000,
    image: 'vacuum.jpg',
    discount: 20
  },
  {
    id: 9,
    name: 'Dell XPS 13',
    price: 13000000,
    monthlyPayment: 1300000,
    image: 'dell.jpg',
    discount: 7
  },
  {
    id: 10,
    name: 'Canon EOS R5',
    price: 18000000,
    monthlyPayment: 1800000,
    image: 'camera.jpg',
    discount: 5
  }
]
</script>

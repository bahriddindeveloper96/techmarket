<!-- Banner.vue -->
<template>
  <div class="w-full bg-gray-50">
    <div class="container mx-auto">
      <!-- Banner Slider -->
      <div class="relative overflow-hidden rounded-xl shadow-lg">
        <swiper 
          :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]" 
          :slides-per-view="1"
          :loop="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          :pagination="{ clickable: true }"
          :navigation="true"
          class="w-full h-[30px]"
        >
          <swiper-slide v-for="(slide, index) in slides" :key="index">
            <div class="relative h-full overflow-hidden group">
              <!-- Background Image with Gradient Overlay -->
              <img 
                :src="slide.image" 
                :alt="slide.title"
                class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
              
              
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay as SwiperAutoplay, Pagination as SwiperPagination, Navigation as SwiperNavigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const slides = [
  
  {
    id: 2,
    title: 'Chegirmalar 50% gacha',
    description: 'Barcha mavsumiy mahsulotlarga maxsus chegirmalar',
    buttonText: 'Ko\'proq bilish',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 3,
    title: 'Yangi smartfonlar',
    description: 'Premium smartfonlar hamyonbop narxlarda',
    buttonText: 'Ko\'proq bilish',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80'
  }
]
</script>

<style>


</style>

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
          class="w-full"
        >
          <swiper-slide v-for="(slide, index) in slides" :key="index">
            <div class="relative aspect-[21/9] overflow-hidden group">
              <!-- Background Image with Gradient Overlay -->
              <img 
                :src="slide.image" 
                :alt="slide.title"
                class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
              
              <!-- Content -->
              <div class="absolute inset-0 flex items-center">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div class="max-w-xl space-y-4">
                    <h2 class="text-4xl font-bold text-white tracking-tight">
                      {{ slide.title }}
                    </h2>
                    <p class="text-lg text-gray-100">
                      {{ slide.description }}
                    </p>
                    <button class="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition-all duration-300 font-medium shadow-lg hover:-translate-y-0.5">
                      Ko'proq bilish
                    </button>
                  </div>
                </div>
              </div>
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
    id: 1,
    title: 'Yangi kolleksiya 2024',
    description: 'Eng so\'nggi trenddagi kiyimlar kolleksiyasi bilan tanishing',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80'
  },
  {
    id: 2,
    title: 'Chegirmalar 50% gacha',
    description: 'Barcha mavsumiy mahsulotlarga maxsus chegirmalar',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 3,
    title: 'Yangi smartfonlar',
    description: 'Premium smartfonlar hamyonbop narxlarda',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80'
  }
]
</script>

<style>
.swiper-pagination-bullet {
  @apply w-2 h-2 bg-white/50;
}
.swiper-pagination-bullet-active {
  @apply bg-[#00BD7E];
}
.swiper-button-next,
.swiper-button-prev {
  @apply text-white/70 hover:text-[#00BD7E] transition-colors duration-300;
}
</style>

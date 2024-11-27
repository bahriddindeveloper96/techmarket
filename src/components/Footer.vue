<!-- Footer.vue -->
<template>
  <footer class="w-full mt-16">
    <div class="w-full px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <!-- Company Info -->
        <div>
          <h3 class="text-xl font-bold text-gray-900 mb-4">TURBO<span class="text-purple-600">MARKET</span></h3>
          <p class="text-sm mb-4">Eng yaxshi onlayn do'kon. Sifatli mahsulotlar, qulay narxlar va tezkor yetkazib berish.</p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-purple-600 transition-colors">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-purple-600 transition-colors">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-purple-600 transition-colors">
              <i class="fab fa-telegram"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-gray-900 font-semibold mb-4">Xaridorlar uchun</h4>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-purple-600 transition-colors">Buyurtma berish</a></li>
            <li><a href="#" class="hover:text-purple-600 transition-colors">Yetkazib berish</a></li>
            <li><a href="#" class="hover:text-purple-600 transition-colors">To'lov usullari</a></li>
            <li><a href="#" class="hover:text-purple-600 transition-colors">Chegirmalar</a></li>
          </ul>
        </div>

        <!-- Help -->
        <div>
          <h4 class="text-gray-900 font-semibold mb-4">Yordam</h4>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-purple-600 transition-colors">Ko'p so'raladigan savollar</a></li>
            <li><a href="#" class="hover:text-purple-600 transition-colors">Qaytarish shartlari</a></li>
            <li><a href="#" class="hover:text-purple-600 transition-colors">Maxfiylik siyosati</a></li>
            <li><a href="#" class="hover:text-purple-600 transition-colors">Foydalanish shartlari</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-gray-900 font-semibold mb-4">Bog'lanish</h4>
          <ul class="space-y-2">
            <li class="flex items-center">
              <i class="fas fa-phone-alt mr-2 text-purple-600"></i>
              <span>+998 90 123 45 67</span>
            </li>
            <li class="flex items-center">
              <i class="fas fa-envelope mr-2 text-purple-600"></i>
              <span>info@turbomarket.uz</span>
            </li>
            <li class="flex items-center">
              <i class="fas fa-map-marker-alt mr-2 text-purple-600"></i>
              <span>Toshkent sh., Chilonzor t.</span>
            </li>
          </ul>
        </div>

        <!-- Mobile App -->
        <div>
          <h4 class="text-gray-900 font-semibold mb-4">Mobil ilova</h4>
          <div class="space-y-3">
            <a href="#" class="block hover:opacity-80 transition-opacity">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" class="h-10">
            </a>
            <a href="#" class="block hover:opacity-80 transition-opacity">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" class="h-10">
            </a>
          </div>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="mt-12 pt-8">
        <div class="flex flex-wrap justify-between items-center">
          <div class="text-sm">
            2024 TurboMarket. Barcha huquqlar himoyalangan
          </div>
          <div class="flex space-x-6 mt-4 lg:mt-0">
            <img src="https://help.payme.uz/images/logo.svg" alt="Payme" class="h-6">
            <img src="https://cdn.paycom.uz/documentation_assets/click_logo.png" alt="Click" class="h-6">
            <img src="https://www.uzcard.uz/templates/uzcard-3/images/logo-f.png" alt="Uzcard" class="h-6">
            <img src="https://humo.uz/assets/humo-logo-white.png" alt="Humo" class="h-6">
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Component logic here
</script>

<style scoped>
/* Additional styles if needed */
</style>

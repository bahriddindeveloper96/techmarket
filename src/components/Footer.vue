<!-- Footer.vue -->
<template>
  <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pb-[60px] md:pb-4">
    <div class="w-full px-2 py-4 md:container md:mx-auto md:px-4">
      <!-- Main Footer -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-4">
        <!-- Company Info -->
        <div class="hidden md:block">
          <h3 class="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ $t('footer.company.title') }}</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{{ $t('footer.company.about') }}</a></li>
            <li><a href="#" class="text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{{ $t('footer.company.careers') }}</a></li>
            <li><a href="#" class="text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{{ $t('footer.company.news') }}</a></li>
            <li><a href="#" class="text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{{ $t('footer.company.partners') }}</a></li>
          </ul>
        </div>
        <!-- Social -->
        <div>
          <h3 class="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ $t('footer.social.title') }}</h3>
          <ul class="flex flex-row flex-wrap gap-2 md:flex-col md:gap-2">
            <li>
              <a href="#" class="flex items-center text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <i class="ri-facebook-fill mr-2"></i>
                {{ $t('footer.social.facebook') }}
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <i class="ri-instagram-line mr-2"></i>
                {{ $t('footer.social.instagram') }}
              </a>
            </li>
            <li>
              <a href="https://t.me/baxa_developer" target="_blank" class="flex items-center text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <i class="ri-telegram-fill mr-2"></i>
                {{ $t('footer.social.telegram') }}
              </a>
            </li>
          </ul>
        </div>
        <!-- Mobile App -->
        <div>
          <h3 class="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ $t('footer.mobileApp.title') }}</h3>
          <p class="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-2">{{ $t('footer.mobileApp.description') }}</p>
          <div class="flex flex-row gap-2 md:flex-col md:gap-3">
            <a 
              href="#" 
              class="flex-1 md:flex-none flex items-center space-x-2 px-3 py-2 md:px-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
            >
              <i class="ri-google-play-fill text-xl md:text-2xl text-gray-900 dark:text-white"></i>
              <div>
                
                <div class="text-sm font-medium text-gray-900 dark:text-white">Google Play</div>
              </div>
            </a>
            <a 
              href="#" 
              class="flex-1 md:flex-none flex items-center space-x-2 px-3 py-2 md:px-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
            >
              <i class="ri-apple-fill text-xl md:text-2xl text-gray-900 dark:text-white"></i>
              <div>
               
                <div class="text-sm font-medium text-gray-900 dark:text-white">App Store</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="block pt-2 border-t border-gray-200 dark:border-gray-800">
        <p class="text-center text-xs md:text-sm text-gray-600 dark:text-gray-400">
          <a href="https://t.me/baxa_developer" target="_blank" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {{ $t('footer.copyright', 2024) }}
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

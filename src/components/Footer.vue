<!-- Footer.vue -->
<template>
  <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
    <div class="container mx-auto px-4 py-8">
      <!-- Main Footer -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
        <!-- Company Info -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ $t('footer.company.title') }}</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{{ $t('footer.company.about') }}</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{{ $t('footer.company.careers') }}</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{{ $t('footer.company.news') }}</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{{ $t('footer.company.partners') }}</a></li>
          </ul>
        </div>

        <!-- Help -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ $t('footer.help.title') }}</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{{ $t('footer.help.shipping') }}</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{{ $t('footer.help.returns') }}</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{{ $t('footer.help.faq') }}</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{{ $t('footer.help.contact') }}</a></li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ $t('footer.legal.title') }}</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{{ $t('footer.legal.privacy') }}</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{{ $t('footer.legal.terms') }}</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{{ $t('footer.legal.security') }}</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{{ $t('footer.legal.sitemap') }}</a></li>
          </ul>
        </div>

        <!-- Social -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ $t('footer.social.title') }}</h3>
          <ul class="space-y-2">
            <li>
              <a href="#" class="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <i class="ri-facebook-fill mr-2"></i>
                {{ $t('footer.social.facebook') }}
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <i class="ri-instagram-line mr-2"></i>
                {{ $t('footer.social.instagram') }}
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <i class="ri-twitter-fill mr-2"></i>
                {{ $t('footer.social.twitter') }}
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <i class="ri-telegram-fill mr-2"></i>
                {{ $t('footer.social.telegram') }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Mobile App -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ $t('footer.mobileApp.title') }}</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">{{ $t('footer.mobileApp.description') }}</p>
          <div class="space-y-3">
            <a 
              href="#" 
              class="flex items-center space-x-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
            >
              <i class="ri-google-play-fill text-2xl text-gray-900 dark:text-white"></i>
              <div>
                <div class="text-xs text-gray-600 dark:text-gray-400">{{ $t('footer.mobileApp.googlePlay') }}</div>
                <div class="text-sm font-medium text-gray-900 dark:text-white">Google Play</div>
              </div>
            </a>
            <a 
              href="#" 
              class="flex items-center space-x-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
            >
              <i class="ri-apple-fill text-2xl text-gray-900 dark:text-white"></i>
              <div>
                <div class="text-xs text-gray-600 dark:text-gray-400">{{ $t('footer.mobileApp.appStore') }}</div>
                <div class="text-sm font-medium text-gray-900 dark:text-white">App Store</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="pt-8 border-t border-gray-200 dark:border-gray-800">
        <p class="text-center text-gray-600 dark:text-gray-400">{{ $t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

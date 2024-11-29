<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="container mx-auto px-4 py-4">
        <h1 class="text-xl font-semibold text-gray-900">{{ $t('profile.title') }}</h1>
      </div>
    </div>

    <!-- Profile Content -->
    <div class="container mx-auto px-4 py-6">
      <!-- User Info Card -->
      <div class="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div class="flex items-center">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-2xl font-semibold">
            JD
          </div>
          <div class="ml-4">
            <h2 class="text-xl font-semibold text-gray-900">John Doe</h2>
            <p class="text-gray-600">+998 90 123 45 67</p>
          </div>
          <button class="ml-auto w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary-600 rounded-xl hover:bg-primary-50">
            <i class="ri-edit-line text-xl"></i>
          </button>
        </div>
      </div>

      <!-- Menu Items -->
      <div class="space-y-4">
        <!-- Orders -->
        <a href="#" class="block bg-white rounded-2xl shadow-sm">
          <div class="p-4 flex items-center">
            <div class="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
              <i class="ri-file-list-3-line text-xl"></i>
            </div>
            <span class="ml-4 text-gray-900 font-medium">{{ $t('profile.orders') }}</span>
            <i class="ri-arrow-right-s-line text-xl text-gray-400 ml-auto"></i>
          </div>
        </a>

        <!-- Favorites -->
        <a href="#" class="block bg-white rounded-2xl shadow-sm">
          <div class="p-4 flex items-center">
            <div class="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
              <i class="ri-heart-3-line text-xl"></i>
            </div>
            <span class="ml-4 text-gray-900 font-medium">{{ $t('profile.favorites') }}</span>
            <i class="ri-arrow-right-s-line text-xl text-gray-400 ml-auto"></i>
          </div>
        </a>

        <!-- Addresses -->
        <a href="#" class="block bg-white rounded-2xl shadow-sm">
          <div class="p-4 flex items-center">
            <div class="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
              <i class="ri-map-pin-2-line text-xl"></i>
            </div>
            <span class="ml-4 text-gray-900 font-medium">{{ $t('profile.addresses') }}</span>
            <i class="ri-arrow-right-s-line text-xl text-gray-400 ml-auto"></i>
          </div>
        </a>

        <!-- Settings -->
        <a href="#" class="block bg-white rounded-2xl shadow-sm">
          <div class="p-4 flex items-center">
            <div class="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
              <i class="ri-settings-3-line text-xl"></i>
            </div>
            <span class="ml-4 text-gray-900 font-medium">{{ $t('profile.settings') }}</span>
            <i class="ri-arrow-right-s-line text-xl text-gray-400 ml-auto"></i>
          </div>
        </a>

        <!-- Help Center -->
        <a href="#" class="block bg-white rounded-2xl shadow-sm">
          <div class="p-4 flex items-center">
            <div class="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
              <i class="ri-question-line text-xl"></i>
            </div>
            <span class="ml-4 text-gray-900 font-medium">{{ $t('profile.help') }}</span>
            <i class="ri-arrow-right-s-line text-xl text-gray-400 ml-auto"></i>
          </div>
        </a>

        <!-- Logout -->
        <button class="w-full bg-white rounded-2xl shadow-sm">
          <div class="p-4 flex items-center">
            <div class="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
              <i class="ri-logout-box-r-line text-xl"></i>
            </div>
            <span class="ml-4 text-red-600 font-medium">{{ $t('profile.logout') }}</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic will be added here
</script>

<template>
  <div class="relative group">
    <!-- Catalog Button -->
    <button
      class="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 dark:bg-purple-700 text-white rounded-xl hover:bg-purple-700 dark:hover:bg-purple-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-lg shadow-purple-200 dark:shadow-none"
      @click="toggleMenu"
    >
      <i class="ri-menu-line text-lg sm:text-xl"></i>
      <span class="text-sm sm:text-base font-medium">{{
        $t("nav.catalog")
      }}</span>
      <i
        :class="[
          'ri-arrow-down-s-line transition-transform',
          { 'rotate-180': isOpen },
        ]"
      ></i>
    </button>

    <!-- Dropdown Menu -->
    <div v-show="isOpen" class="fixed top-[96px] left-0 right-0 z-50 mt-8">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 max-h-[80vh] sm:max-h-[650px] overflow-hidden"
        >
          <!-- Content -->
          <div class="flex flex-col sm:flex-row h-full">
            <!-- Main Categories -->
            <div
              class="w-full sm:w-72 bg-gray-50 dark:bg-gray-900 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 dark:scrollbar-thumb-purple-400 scrollbar-track-gray-100 dark:scrollbar-track-gray-800 hover:scrollbar-thumb-purple-600 dark:hover:scrollbar-thumb-purple-500 max-h-[300px] sm:max-h-[650px] rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
            >
              <div
                v-for="category in categories"
                :key="category.id"
                class="relative"
                @mouseenter="activeCategory = category"
                @click="handleCategoryClick(category)"
              >
                <div
                  class="flex items-center px-4 py-3 cursor-pointer"
                  :class="{
                    'bg-white dark:bg-gray-800': activeCategory === category,
                  }"
                >
                  <div
                    class="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700 mr-3"
                  >
                    <i
                      :class="[category.icon, 'text-lg dark:text-gray-300']"
                    ></i>
                  </div>
                  <span class="font-medium text-gray-700 dark:text-gray-200">{{
                    $t(category.name)
                  }}</span>
                  <i
                    class="ri-arrow-right-s-line ml-auto text-gray-400 dark:text-gray-500"
                  ></i>
                </div>
              </div>
            </div>

            <!-- Subcategories Panel -->
            <div
              v-if="activeCategory"
              class="flex-1 p-4 sm:p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 dark:scrollbar-thumb-purple-400 scrollbar-track-gray-100 dark:scrollbar-track-gray-800 hover:scrollbar-thumb-purple-600 dark:hover:scrollbar-thumb-purple-500 max-h-[calc(80vh-300px)] sm:max-h-[650px]"
            >
              <div class="max-w-full sm:max-w-4xl">
                <!-- Subcategories Grid -->
                <div
                  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-x-12 sm:gap-y-8"
                >
                  <div
                    v-for="subcategory in activeCategory.subcategories"
                    :key="subcategory.id"
                  >
                    <!-- Subcategory Header -->
                    <router-link
                      :to="subcategory.link"
                      class="block mb-3 sm:mb-4 text-base sm:text-lg font-medium text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
                      @click="isOpen = false"
                    >
                      {{ $t(subcategory.name) }}
                    </router-link>

                    <!-- Subcategory Items -->
                    <ul class="space-y-2">
                      <li v-for="item in subcategory.items" :key="item.id">
                        <router-link
                          :to="item.link"
                          class="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          @click="isOpen = false"
                        >
                          {{ $t(item.name) }}
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import axios from "axios";

const { t } = useI18n();
const router = useRouter();
const isOpen = ref(false);
const activeCategory = ref(null);
const categories = ref([]);

const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const token = "7|MKTulSoz5KuBSjF4v1CmSsVdD6LYHsDZo2PJxGDV2162af25";

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/homepage`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    if (response.data.success) {
      categories.value = response.data.data.categories
        .filter((category) => category.active)
        .map((category) => ({
          id: category.id,
          name: category.name,
          icon: getCategoryIcon(category.slug),
          link: `/category/${category.slug}`,
          subcategories: [],
          description: category.description,
          image: category.image.startsWith("http")
            ? category.image
            : `${baseUrl}${category.image}`,
          featured: category.featured,
          order: category.order,
        }))
        .sort((a, b) => {
          // Sort by featured first, then by order
          if (a.featured !== b.featured) return b.featured - a.featured;
          return a.order - b.order;
        });

      if (categories.value.length > 0) {
        activeCategory.value = categories.value[0];
      }
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const getCategoryIcon = (slug) => {
  const icons = {
    smartphones: "ri-smartphone-line",
    laptops: "ri-laptop-line",
    tablets: "ri-tablet-line",
    accessories: "ri-headphone-line",
    "smart-watches": "ri-watch-line",
  };
  return icons[slug] || "ri-apps-line";
};

// Add scroll event listener
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  fetchCategories();
});

// Clean up event listener
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Handle scroll event
const handleScroll = () => {
  if (window.scrollY > 0) {
    isOpen.value = false;
  }
};

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value && categories.value.length > 0) {
    activeCategory.value = categories.value[0];
  }
};

const handleCategoryClick = (category) => {
  router.push(category.link);
  isOpen.value = false;
};
</script>

<style scoped>
/* Custom scrollbar styles */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800 rounded-full;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  @apply bg-purple-500 dark:bg-purple-400 rounded-full transition-colors duration-200;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  @apply bg-purple-600 dark:bg-purple-500;
}

/* Hide scrollbar for Firefox */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: theme("colors.purple.500") theme("colors.gray.100");
}

:global(.dark) .scrollbar-thin {
  scrollbar-color: theme("colors.purple.400") theme("colors.gray.800");
}

/* Hide scrollbar for IE and Edge */
.scrollbar-thin {
  -ms-overflow-style: none;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<template>
  <main class="py-2" v-if="product">
    <!-- Breadcrumb -->
    <div class="mx-auto px-4 py-2">
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <router-link
              to="/"
              class="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Bosh sahifa
            </router-link>
          </li>
          <li>
            <div class="flex items-center">
              <svg
                class="w-3 h-3 text-gray-400 dark:text-gray-600 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span class="text-gray-500 dark:text-gray-400">{{
                product.category.name
              }}</span>
            </div>
          </li>
        </ol>
      </nav>
    </div>

    <!-- Product Info -->
    <div
      class="bg-white dark:bg-gray-900 rounded-3xl shadow-lg shadow-purple-100/50 dark:shadow-purple-900/50 overflow-hidden"
    >
      <div class="grid grid-cols-1 md:grid-cols-5 gap-8 p-8">
        <!-- Left Column - Product Images (3 column) -->
        <div class="md:col-span-3 space-y-6">
          <!-- Main Images -->
          <div class="grid md:grid-cols-2 grid-cols-1 gap-2 relative group">
            <div
              v-if="selectedImage"
              class="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50 to-gray-50 dark:from-purple-900/20 dark:to-gray-800 cursor-pointer relative"
              @click="openImageModal(selectedImage)"
            >
              <img
                :src="selectedImage"
                :alt="product.name"
                class="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div
              v-if="nextImage"
              class="hidden md:block aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50 to-gray-50 dark:from-purple-900/20 dark:to-gray-800 cursor-pointer relative"
              @click="openImageModal(nextImage)"
            >
              <img
                :src="nextImage"
                :alt="product.name"
                class="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <!-- Navigation Buttons -->
            <button
              v-if="product.images?.length > 1"
              @click="previousImage"
              class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <svg
                class="w-6 h-6 text-gray-800 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              v-if="product.images?.length > 1"
              @click="nextImageSlide"
              class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <svg
                class="w-6 h-6 text-gray-800 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <!-- Thumbnail Grid -->
          <div v-if="product.images?.length" class="grid grid-cols-5 gap-2">
            <button
              v-for="(image, index) in product.images"
              :key="index"
              @click="selectedImageIndex = index"
              class="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-gray-50 dark:from-purple-900/20 dark:to-gray-800 relative hover:shadow-lg transition-all duration-300"
              :class="
                selectedImageIndex === index
                  ? 'ring-2 ring-purple-500 dark:ring-purple-400 shadow-lg'
                  : ''
              "
            >
              <img
                :src="image"
                :alt="product.name"
                class="absolute inset-0 w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <!-- Right Column - Product Details (2 column) -->
        <div class="md:col-span-2 p-4 space-y-4">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ product.name }}
          </h1>

          <!-- Rating & Reviews -->
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <div class="flex items-center">
                <svg
                  v-for="i in 5"
                  :key="i"
                  :class="[
                    'w-4 h-4',
                    i <= product.rating
                      ? 'text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600',
                  ]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400"
                >{{ product.rating }} {{ $t("product.rating") }}</span
              >
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-400"
              >{{ product.reviews }} {{ $t("product.reviews") }}</span
            >
            <span class="text-sm text-gray-600 dark:text-gray-400"
              >{{ product.orders }} {{ $t("product.orders") }}</span
            >
          </div>

          <!-- Price -->
          <div
            class="bg-gradient-to-br from-purple-50 to-gray-50 dark:from-purple-900/20 dark:to-gray-800 rounded-xl p-2 space-y-2"
          >
            <div class="flex items-baseline gap-2">
              <span
                class="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent"
              >
                {{ formatPrice(product.price) }} {{ $t("currency") }}
              </span>
              <span
                v-if="product.oldPrice"
                class="text-base text-gray-400 dark:text-gray-500 line-through"
              >
                {{ formatPrice(product.oldPrice) }} {{ $t("currency") }}
              </span>
            </div>
            <div v-if="product.oldPrice" class="flex items-center gap-2">
              <span
                class="px-1 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs font-medium"
              >
                -{{ calculateDiscount(product.price, product.oldPrice) }}%
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">{{
                $t("product.sale_price")
              }}</span>
            </div>
          </div>

          <!-- Colors -->
          <div v-if="product.colors?.length" class="space-y-2">
            <h3 class="font-medium text-gray-900 dark:text-white">
              {{ $t("product.colors") }}
            </h3>
            <div class="flex gap-2">
              <button
                v-for="color in product.colors"
                :key="color"
                @click="selectedColor = color"
                class="w-8 h-8 rounded-full border-2 dark:border-gray-700 transition-all duration-300"
                :class="
                  selectedColor === color
                    ? 'ring-2 ring-purple-500 dark:ring-purple-400 ring-offset-2 dark:ring-offset-gray-900'
                    : ''
                "
                :style="{ backgroundColor: color }"
              ></button>
            </div>
          </div>

          <!-- Sizes -->
          <div v-if="product.sizes?.length" class="space-y-2">
            <h3 class="font-medium text-gray-900 dark:text-white">
              {{ $t("product.sizes") }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="size in product.sizes"
                :key="size"
                @click="selectedSize = size"
                class="px-2 py-2 rounded-lg border transition-all duration-300"
                :class="
                  selectedSize === size
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400'
                "
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Quantity -->
          <div class="space-y-2">
            <h3 class="font-medium text-gray-900 dark:text-white">
              {{ $t("product.quantity") }}
            </h3>
            <div class="flex items-center gap-2">
              <button
                @click="quantity > 1 && quantity--"
                class="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
              >
                <svg
                  class="w-4 h-4 text-gray-600 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <span
                class="text-lg font-medium w-8 text-center text-gray-900 dark:text-white"
                >{{ quantity }}</span
              >
              <button
                @click="quantity++"
                class="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
              >
                <svg
                  class="w-4 h-4 text-gray-600 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Add to Cart Button -->
          <button
            @click="addToCart"
            id="addToCartButton"
            class="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-purple-900 dark:hover:from-purple-500 dark:hover:to-purple-700 transition-all duration-300 shadow-lg shadow-purple-500/30 dark:shadow-purple-800/30"
          >
            {{ $t("product.add_to_cart") }}
          </button>
        </div>
      </div>
    </div>
  </main>

  <!-- Loading State -->
  <div v-else class="py-2">
    <div class="mx-auto px-4 py-8">
      <div class="animate-pulse space-y-8">
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div class="md:col-span-3 space-y-4">
            <div
              class="aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl"
            ></div>
            <div class="grid grid-cols-5 gap-2">
              <div
                v-for="n in 5"
                :key="n"
                class="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl"
              ></div>
            </div>
          </div>
          <div class="md:col-span-2 space-y-4">
            <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div class="flex gap-2">
                <div
                  v-for="n in 4"
                  :key="n"
                  class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"
                ></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div class="flex gap-2">
                <div
                  v-for="n in 4"
                  :key="n"
                  class="w-16 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"
                ></div>
              </div>
            </div>
            <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Image Modal -->
  <div
    v-if="showModal"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
    @click="closeImageModal"
  >
    <button
      @click="showPrevImage"
      class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
    >
      <svg
        class="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>

    <button
      @click="showNextImage"
      class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
    >
      <svg
        class="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>

    <button
      @click="closeImageModal"
      class="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
    >
      <svg
        class="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <img
      :src="modalImage"
      :alt="product?.name"
      class="max-w-full max-h-[90vh] object-contain"
      @click.stop
    />
  </div>
  <!-- Similar Products -->
  <div class="mt-2">
    <h2
      class="text-2xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent dark:text-white"
    >
      {{ $t("cart.similar_products") }}
    </h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <ProductCard
        v-for="product in similarProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore';
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import ProductCard from "@/components/ProductCard.vue";

const router = useRouter();
const cartStore = useCartStore();
const route = useRoute();
const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const token = "7|MKTulSoz5KuBSjF4v1CmSsVdD6LYHsDZo2PJxGDV2162af25";

// Product data
const product = ref(null);
const selectedVariant = ref(null);
const selectedImageIndex = ref(0);
const similarProducts = computed(() => {
  if (!product.value?.featured_products) return [];

  return product.value.featured_products
    .filter((p) => p.id !== product.value.id)
    .map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.variants?.[0]?.price || 0,
      oldPrice: p.variants?.[0]?.price * 1.2 || 0,
      image: p.variants?.[0]?.images?.[0] || p.images?.[0]?.image,
      rating: p.average_rating || 0,
      category: p.category?.name,
      favorite_count: p.favorite_count || 0,
    }));
});

// Fetch product data
const fetchProduct = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/products/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    if (response.data.message === "Product retrieved successfully") {
      const productData = response.data.data.data;
      product.value = {
        ...productData,
        price: productData.variants?.[0]?.price || 0,
        oldPrice: productData.variants?.[0]?.price * 1.2 || 0,
        rating: productData.average_rating || 0,
        reviews: 0,
        orders: 0,
        colors: [
          ...new Set(
            productData.variants?.map((v) => v.attribute_values.Color)
          ),
        ],
        sizes: [
          ...new Set(
            productData.variants?.map((v) => v.attribute_values.Storage)
          ),
        ],
        images:
          productData.variants?.[0]?.images ||
          productData.images?.map((img) => img.image) ||
          [],
      };
      selectedVariant.value = productData.variants?.[0];
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

// Computed properties for image navigation
const selectedImage = computed(() => {
  return product.value?.images?.[selectedImageIndex.value] || "";
});

const nextImage = computed(() => {
  if (!product.value?.images?.length) return "";
  const nextIndex =
    (selectedImageIndex.value + 1) % product.value.images.length;
  return product.value.images[nextIndex];
});

// Image navigation functions
const previousImage = () => {
  if (!product.value?.images?.length) return;
  const length = product.value.images.length;
  selectedImageIndex.value = (selectedImageIndex.value - 1 + length) % length;
};

const nextImageSlide = () => {
  if (!product.value?.images?.length) return;
  const length = product.value.images.length;
  selectedImageIndex.value = (selectedImageIndex.value + 1) % length;
};

// Modal functionality
const showModal = ref(false);
const modalImage = ref("");
const currentImageIndex = ref(0);

const openImageModal = (image) => {
  modalImage.value = image;
  currentImageIndex.value = product.value.images.indexOf(image);
  showModal.value = true;
  document.body.style.overflow = "hidden";
};

const closeImageModal = () => {
  showModal.value = false;
  document.body.style.overflow = "auto";
};

const showPrevImage = () => {
  if (!product.value?.images?.length) return;
  const length = product.value.images.length;
  currentImageIndex.value = (currentImageIndex.value - 1 + length) % length;
  modalImage.value = product.value.images[currentImageIndex.value];
};

const showNextImage = () => {
  if (!product.value?.images?.length) return;
  const length = product.value.images.length;
  currentImageIndex.value = (currentImageIndex.value + 1) % length;
  modalImage.value = product.value.images[currentImageIndex.value];
};

// Keyboard navigation
onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
  fetchProduct();
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});

const handleKeydown = (e) => {
  if (!showModal.value) return;

  switch (e.key) {
    case "ArrowLeft":
      showPrevImage();
      break;
    case "ArrowRight":
      showNextImage();
      break;
    case "Escape":
      closeImageModal();
      break;
  }
};

// State variables
const selectedColor = ref(null);
const selectedSize = ref(null);
const quantity = ref(1);

// Watch for variant changes
const updateSelectedVariant = () => {
  if (!selectedColor.value || !selectedSize.value || !product.value?.variants)
    return;

  const newVariant = product.value.variants.find(
    (v) =>
      v.attribute_values.Color === selectedColor.value &&
      v.attribute_values.Storage === selectedSize.value
  );

  if (newVariant) {
    selectedVariant.value = newVariant;
    product.value.price = newVariant.price;
    product.value.oldPrice = newVariant.price * 1.2;
    product.value.images = newVariant.images;
    selectedImageIndex.value = 0;
  }
};

// Watch for color and size changes
watch([selectedColor, selectedSize], updateSelectedVariant);

const addToCart = () => {
  if (!selectedVariant.value) {
    // Agar variant tanlanmagan bo'lsa, foydalanuvchiga xabar beramiz
    alert('Iltimos, rang va xotira hajmini tanlang')
    return
  }

  const cartItem = {
    id: selectedVariant.value.id,
    productId: product.value.id,
    name: product.value.name,
    price: selectedVariant.value.price,
    oldPrice: selectedVariant.value.price * 1.2,
    color: selectedColor.value,
    size: selectedSize.value,
    quantity: quantity.value,
    image: selectedVariant.value.images[0] || product.value.images[0],
    variant: selectedVariant.value,
    attributes: {
      color: selectedColor.value,
      storage: selectedSize.value
    }
  }
  

  cartStore.addToCart(cartItem)
};

// Helper functions
const formatPrice = (price) => {
  if (!price) return "0";
  return new Intl.NumberFormat("uz-UZ").format(price);
};

const calculateDiscount = (price, oldPrice) => {
  if (!price || !oldPrice) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
};

// Initialize default values when product data is loaded
watch(
  () => product.value,
  (newProduct) => {
    if (newProduct?.colors?.length) {
      selectedColor.value = newProduct.colors[0];
    }
    if (newProduct?.sizes?.length) {
      selectedSize.value = newProduct.sizes[0];
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.prose {
  max-width: none;
}
</style>

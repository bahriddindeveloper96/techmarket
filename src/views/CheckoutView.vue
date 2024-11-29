<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
    <Banner />
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Checkout form -->
        <div class="md:w-2/3">
          <div class="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 class="text-xl font-semibold mb-6">Yetkazib berish ma'lumotlari</h2>
            <form @submit.prevent="submitOrder" class="space-y-6">
              <!-- Contact Information -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Ism</label>
                  <input 
                    type="text" 
                    v-model="form.firstName"
                    class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Familiya</label>
                  <input 
                    type="text" 
                    v-model="form.lastName"
                    class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                  <input 
                    type="tel" 
                    v-model="form.phone"
                    class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    v-model="form.email"
                    class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                </div>
              </div>

              <!-- Delivery Methods -->
              <div class="space-y-4">
                <h3 class="text-lg font-medium">Yetkazib berish usuli</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label 
                    v-for="method in deliveryMethods" 
                    :key="method.id"
                    class="relative flex p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-purple-500 transition-colors"
                    :class="{ 'border-purple-500 bg-purple-50': form.deliveryMethod === method.id }"
                  >
                    <input
                      type="radio"
                      :value="method.id"
                      v-model="form.deliveryMethod"
                      class="sr-only"
                    >
                    <div class="flex items-start gap-4">
                      <img :src="method.icon" :alt="method.name" class="w-10 h-10 object-contain">
                      <div>
                        <p class="font-medium text-gray-900">{{ method.name }}</p>
                        <p class="text-sm text-gray-500">{{ method.description }}</p>
                        <p class="text-sm font-medium text-purple-600 mt-1">{{ method.price === 0 ? 'Bepul' : formatPrice(method.price) }}</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Payment Methods -->
              <div class="space-y-4">
                <h3 class="text-lg font-medium">To'lov usuli</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label 
                    v-for="method in paymentMethods" 
                    :key="method.id"
                    class="relative flex p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-purple-500 transition-colors"
                    :class="{ 'border-purple-500 bg-purple-50': form.paymentMethod === method.id }"
                  >
                    <input
                      type="radio"
                      :value="method.id"
                      v-model="form.paymentMethod"
                      class="sr-only"
                    >
                    <div class="flex items-center gap-3">
                      <img :src="method.icon" :alt="method.name" class="w-8 h-8 object-contain">
                      <span class="font-medium text-gray-900">{{ method.name }}</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Address -->
              <div v-if="needsAddress" class="space-y-4">
                <h3 class="text-lg font-medium">Yetkazib berish manzili</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Manzil</label>
                    <input 
                      type="text" 
                      v-model="form.address"
                      class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Shahar</label>
                    <input 
                      type="text" 
                      v-model="form.city"
                      class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Pochta indeksi</label>
                    <input 
                      type="text" 
                      v-model="form.zipCode"
                      class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    >
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                class="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl px-6 py-3 font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-300 hover:shadow-lg hover:shadow-purple-200 active:scale-[0.98]"
              >
                Buyurtma berish
              </button>
            </form>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="md:w-1/3">
          <div class="bg-white rounded-2xl shadow-sm p-6 sticky top-4">
            <h2 class="text-xl font-semibold mb-6">Buyurtma ma'lumotlari</h2>
            
            <div class="space-y-4 mb-6">
              <div v-for="item in cartItems" :key="item.id" class="flex gap-4">
                <div class="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 p-2 flex-shrink-0">
                  <img :src="item.image" :alt="item.name" class="w-full h-full object-contain">
                </div>
                <div class="flex-grow">
                  <h3 class="text-sm font-medium text-gray-900">{{ item.name }}</h3>
                  <p class="text-sm text-gray-500">{{ item.quantity }} dona</p>
                  <p class="text-sm font-medium text-purple-600">{{ formatPrice(item.price * item.quantity) }}</p>
                </div>
              </div>
            </div>

            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Mahsulotlar ({{ totalItems }})</span>
                <span>{{ formatPrice(subtotal) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Chegirma</span>
                <span class="text-green-500">-{{ formatPrice(discount) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Yetkazib berish</span>
                <span>{{ selectedDeliveryMethod ? formatPrice(selectedDeliveryMethod.price) : 'Tanlanmagan' }}</span>
              </div>
              <div class="border-t pt-3 flex justify-between font-medium">
                <span>Jami</span>
                <span class="text-lg text-purple-600">{{ formatPrice(total) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from './../components/Banner.vue'

export default {
  name: 'CheckoutView',
  components: {
    Banner
  },
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        deliveryMethod: '',
        paymentMethod: ''
      },
      cartItems: [
        {
          id: 1,
          name: 'iPhone 15 Pro Max 256GB Natural Titanium',
          price: 15999000,
          image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
          quantity: 1
        },
        {
          id: 2,
          name: 'Samsung Galaxy S23 Ultra 512GB Black',
          price: 13500000,
          image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
          quantity: 1
        }
      ],
      deliveryMethods: [
        {
          id: 'emu',
          name: 'EMU Delivery',
          description: 'Toshkent bo\'ylab 24 soat ichida',
          price: 30000,
          icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk_P5zKv3801eTxEWquH6nRIuxiRxulbFEvg&s'
        },
        {
          id: 'fargo',
          name: 'Fargo Express',
          description: 'O\'zbekiston bo\'ylab 1-3 kun',
          price: 50000,
          icon: 'https://scontent.ftas1-1.fna.fbcdn.net/v/t39.30808-6/295013606_461090876023233_6333258526135505009_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=n6lupkp9euAQ7kNvgFkmIqY&_nc_zt=23&_nc_ht=scontent.ftas1-1.fna&_nc_gid=ASMCj-4TQ_Cv5ISxPMU2CkT&oh=00_AYAjMTGRYP6wXFXnB99koFfWmSjmmHPPxrQQ60o7X8PQ7Q&oe=674FFD80'
        },
        {
          id: 'btc',
          name: 'BTC Express',
          description: 'O\'zbekiston bo\'ylab 2-5 kun',
          price: 40000,
          icon: 'https://bts.uz/img/logo_new.png'
        },
        {
          id: 'pickup',
          name: 'Do\'kondan olish',
          description: 'Istalgan vaqtda',
          price: 0,
          icon: 'https://cdn-icons-png.flaticon.com/512/1198/1198310.png'
        }
      ],
      paymentMethods: [
        {
          id: 'click',
          name: 'Click',
          icon: 'https://api.logobank.uz/media/logos_png/Uzcard-01.png'
        },
        {
          id: 'payme',
          name: 'Payme',
          icon: 'https://api.logobank.uz/media/logos_png/payme-01.png'
        },
        
        {
          id: 'cash',
          name: 'Naqd pul',
          icon: 'https://cdn-icons-png.flaticon.com/512/2489/2489756.png'
        }
      ]
    }
  },
  computed: {
    needsAddress() {
      return this.form.deliveryMethod && this.form.deliveryMethod !== 'pickup'
    },
    selectedDeliveryMethod() {
      return this.deliveryMethods.find(method => method.id === this.form.deliveryMethod)
    },
    totalItems() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0)
    },
    subtotal() {
      return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    discount() {
      return 0 // Calculate discount if needed
    },
    total() {
      const deliveryPrice = this.selectedDeliveryMethod ? this.selectedDeliveryMethod.price : 0
      return this.subtotal - this.discount + deliveryPrice
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('uz-UZ').format(price) + " so'm"
    },
    submitOrder() {
      // Handle order submission
      console.log('Order submitted:', {
        ...this.form,
        items: this.cartItems,
        total: this.total
      })
    }
  }
}
</script>

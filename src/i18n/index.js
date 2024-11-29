import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      about: 'About',
      contact: 'Contact',
      company_info: 'Company Info',
      contacts: 'Contacts',
      stores: 'Stores',
      delivery: 'Delivery',
      favorites: 'Favorites',
      profile: 'Profile',
      cart: 'Cart',
      new: 'New',
      sales: 'Sales',
      hot_deals: 'Hot Deals',
      promotions: 'Promotions',
      catalog: 'Catalog'
    },
    header: {
      search: 'Search products...',
      cart: 'Cart',
      login: 'Login',
      register: 'Register'
    },
    profile: {
      title: 'Profile',
      settings: 'Settings',
      orders: 'My Orders',
      favorites: 'Favorites',
      addresses: 'Delivery Addresses',
      help: 'Help Center',
      logout: 'Log Out'
    },
    favorites: {
      empty_title: 'No favorites yet',
      empty_description: 'Products you like will appear here. Start browsing to add some!',
      browse_products: 'Browse Products'
    }
  },
  ru: {
    nav: {
      home: 'Главная',
      products: 'Продукты',
      about: 'О нас',
      contact: 'Контакты',
      company_info: 'О компании',
      contacts: 'Контакты',
      stores: 'Магазины',
      delivery: 'Доставка',
      favorites: 'Избранное',
      profile: 'Профиль',
      cart: 'Корзина',
      new: 'Новинки',
      sales: 'Распродажа',
      hot_deals: 'Хиты продаж',
      promotions: 'Акции',
      catalog: 'Каталог'
    },
    header: {
      search: 'Поиск товаров...',
      cart: 'Корзина',
      login: 'Войти',
      register: 'Регистрация'
    },
    profile: {
      title: 'Профиль',
      settings: 'Настройки',
      orders: 'Мои заказы',
      favorites: 'Избранное',
      addresses: 'Адреса доставки',
      help: 'Центр помощи',
      logout: 'Выйти'
    },
    favorites: {
      empty_title: 'Пока нет избранного',
      empty_description: 'Здесь появятся товары, которые вам понравятся. Начните просмотр, чтобы добавить что-нибудь!',
      browse_products: 'Просмотреть товары'
    }
  },
  uz: {
    nav: {
      home: 'Bosh sahifa',
      products: 'Mahsulotlar',
      about: 'Biz haqimizda',
      contact: 'Aloqa',
      company_info: 'Kompaniya haqida',
      contacts: 'Kontaktlar',
      stores: 'Do\'konlar',
      delivery: 'Yetkazib berish',
      favorites: 'Sevimlilar',
      profile: 'Profil',
      cart: 'Savatcha',
      new: 'Yangi',
      sales: 'Chegirmalar',
      hot_deals: 'Xit savdo',
      promotions: 'Aksiyalar',
      catalog: 'Katalog'
    },
    header: {
      search: 'Mahsulotlarni qidirish...',
      cart: 'Savatcha',
      login: 'Kirish',
      register: 'Ro\'yxatdan o\'tish'
    },
    profile: {
      title: 'Profil',
      settings: 'Sozlamalar',
      orders: 'Buyurtmalarim',
      favorites: 'Sevimlilar',
      addresses: 'Yetkazib berish manzillari',
      help: 'Yordam markazi',
      logout: 'Chiqish'
    },
    favorites: {
      empty_title: 'Sevimlilar hali yo\'q',
      empty_description: 'Sizga yoqqan mahsulotlar shu yerda ko\'rinadi. Qo\'shish uchun mahsulotlarni ko\'rib chiqing!',
      browse_products: 'Mahsulotlarni ko\'rish'
    }
  }
}

export default createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'uz',
  fallbackLocale: 'uz',
  messages
})

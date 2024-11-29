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
    },
    footer: {
      company: {
        title: 'Company',
        about: 'About Us',
        careers: 'Careers',
        news: 'News',
        partners: 'Partners'
      },
      help: {
        title: 'Help',
        shipping: 'Shipping',
        returns: 'Returns',
        faq: 'FAQ',
        contact: 'Contact'
      },
      legal: {
        title: 'Legal',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        security: 'Security',
        sitemap: 'Sitemap'
      },
      social: {
        title: 'Follow Us',
        facebook: 'Facebook',
        instagram: 'Instagram',
        twitter: 'Twitter',
        telegram: 'Telegram'
      },
      mobileApp: {
        title: 'Mobile App',
        description: 'Download our mobile app for a better shopping experience',
        googlePlay: 'Get it on Google Play',
        appStore: 'Download on the App Store'
      },
      newsletter: {
        title: 'Subscribe to our newsletter',
        description: 'Get the latest news and special offers',
        placeholder: 'Enter your email',
        button: 'Subscribe',
        success: 'Thank you for subscribing!'
      },
      copyright: ' 2024 TechMarket. All rights reserved.'
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
    },
    footer: {
      company: {
        title: 'Компания',
        about: 'О нас',
        careers: 'Карьера',
        news: 'Новости',
        partners: 'Партнеры'
      },
      help: {
        title: 'Помощь',
        shipping: 'Доставка',
        returns: 'Возврат',
        faq: 'FAQ',
        contact: 'Контакты'
      },
      legal: {
        title: 'Правовая информация',
        privacy: 'Политика конфиденциальности',
        terms: 'Условия использования',
        security: 'Безопасность',
        sitemap: 'Карта сайта'
      },
      social: {
        title: 'Мы в соцсетях',
        facebook: 'Facebook',
        instagram: 'Instagram',
        twitter: 'Twitter',
        telegram: 'Telegram'
      },
      mobileApp: {
        title: 'Мобильное приложение',
        description: 'Скачайте наше мобильное приложение для удобных покупок',
        googlePlay: 'Скачать в Google Play',
        appStore: 'Скачать в App Store'
      },
      newsletter: {
        title: 'Подпишитесь на нашу рассылку',
        description: 'Получайте новости и специальные предложения',
        placeholder: 'Введите ваш email',
        button: 'Подписаться',
        success: 'Спасибо за подписку!'
      },
      copyright: ' 2024 TechMarket. Все права защищены.'
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
    },
    footer: {
      company: {
        title: 'Kompaniya',
        about: 'Biz haqimizda',
        careers: 'Karyera',
        news: 'Yangiliklar',
        partners: 'Hamkorlar'
      },
      help: {
        title: 'Yordam',
        shipping: 'Yetkazib berish',
        returns: 'Qaytarish',
        faq: 'FAQ',
        contact: 'Aloqa'
      },
      legal: {
        title: 'Huquqiy ma\'lumot',
        privacy: 'Maxfiylik siyosati',
        terms: 'Foydalanish shartlari',
        security: 'Xavfsizlik',
        sitemap: 'Sayt xaritasi'
      },
      social: {
        title: 'Bizni kuzating',
        facebook: 'Facebook',
        instagram: 'Instagram',
        twitter: 'Twitter',
        telegram: 'Telegram'
      },
      mobileApp: {
        title: 'Mobil ilova',
        description: 'Qulay xarid qilish uchun mobil ilovamizni yuklab oling',
        googlePlay: 'Google Play dan yuklab olish',
        appStore: 'App Store dan yuklab olish'
      },
      newsletter: {
        title: 'Yangiliklarimizga obuna bo\'ling',
        description: 'Yangiliklar va maxsus takliflarni oling',
        placeholder: 'Emailingizni kiriting',
        button: 'Obuna bo\'lish',
        success: 'Obuna bo\'lganingiz uchun rahmat!'
      },
      copyright: ' 2024 TechMarket. Barcha huquqlar himoyalangan.'
    }
  }
}

export default createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'uz',
  fallbackLocale: 'uz',
  messages
})

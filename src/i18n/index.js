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
      catalog: 'Catalog',
      see_all: 'See All'
    },
    header: {
      search: 'Search products...',
      cart: 'Cart',
      login: 'Login',
      register: 'Register'
    },
    profile: {
      title: 'My Profile',
      personal_info: 'Personal Information',
      orders: 'My Orders',
      favorites: 'Favorites',
      settings: 'Settings',
      help: 'Help Center',
      logout: 'Log Out',
      first_name: 'First Name',
      last_name: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      birthday: 'Birthday',
      gender: 'Gender',
      address: 'Address',
      select: 'Select',
      male: 'Male',
      female: 'Female',
      save: 'Save Changes',
      placeholders: {
        first_name: 'Enter your first name',
        last_name: 'Enter your last name',
        email: 'email@example.com',
        phone: '+998 90 123 45 67',
        address: 'Enter your full address'
      }
    },
    favorites: {
      title: 'Favorites',
      category: 'Category',
      empty: {
        title: 'Your favorites list is empty',
        description: 'Add items you like to your favorites list. Review them anytime and easily move them to the cart.',
        button: 'Continue Shopping'
      },
      remove: 'Remove',
      add_to_cart: 'Add to Cart',
      move_all_to_cart: 'Move All to Cart',
      clear_all: 'Clear All',
      items_count: 'items',
      item_count: 'item',
      save_for_later: 'Save for later',
      price: 'Price',
      total: 'Total',
      success: {
        added: 'Added to favorites',
        removed: 'Removed from favorites',
        moved_to_cart: 'Moved to cart',
        cleared: 'Favorites list cleared'
      },
      recommended: 'Recommended Products',
      recommended_products: 'Recommended Products'
    },
    currency: 'USD',
    month: 'months',
    product: {
      about: 'About Product',
      specifications: 'Specifications',
      similar: 'Similar Products',
      add_to_cart: 'Add to Cart',
      monthly_payment: 'Monthly Payment',
      sale_price: 'Sale Price',
      rating: 'Rating',
      reviews: 'Reviews',
      orders: 'Orders',
      colors: 'Colors',
      sizes: 'Sizes',
      quantity: 'Quantity'
    },
    cart: {
      title: 'Shopping Cart',
      empty: 'Your cart is empty',
      total: 'Total',
      checkout: 'Proceed to Checkout',
      continue_shopping: 'Continue Shopping',
      remove: 'Remove',
      quantity: 'Quantity',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      free: 'Free',
      total_items: 'items',
      clear_cart: 'Clear Cart',
      save_for_later: 'Save for Later',
      similar_products: 'You may also like'
    },
    checkout: {
      title: 'Checkout',
      personal_info: 'Personal Information',
      first_name: 'First Name',
      last_name: 'Last Name',
      phone: 'Phone Number',
      email: 'Email',
      shipping_method: 'Shipping Method',
      payment_method: 'Payment Method',
      order_summary: 'Order Summary',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      total: 'Total',
      quantity: 'Quantity',
      free: 'Free',
      place_order: 'Place Order',
      shipping_methods: {
        standard: {
          title: 'Standard Delivery',
          description: '3-5 business days',
          free: 'Free Shipping'
        },
        express: {
          title: 'Express Delivery',
          description: '1-2 business days',
          price: '50,000 UZS'
        },
        pickup: {
          title: 'Store Pickup',
          description: 'Available today',
          free: 'Free'
        }
      }
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
        faq: 'FAQ',
        delivery: 'Delivery',
        returns: 'Returns',
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
    },
    home: {
      popular_products: 'Popular Products',
      new_products: 'New Products',
      view_all: 'View All'
    },
    categories: {
      electronics: 'Electronics',
      appliances: 'Home Appliances',
      clothing: 'Clothing',
      footwear: 'Footwear',
      accessories: 'Accessories',
      beauty: 'Beauty'
    },
    category: {
      title: 'Categories',
      filter: {
        title: 'Filters',
        price: 'Price',
        brand: 'Brand',
        color: 'Color',
        size: 'Size',
        sort: 'Sort by',
        apply: 'Apply Filters',
        clear: 'Clear Filters',
        price_range: 'Price Range',
        min_price: 'Min Price',
        max_price: 'Max Price',
        rating: 'Rating',
        rating_and_up: 'and up',
        availability: 'Availability',
        in_stock: 'In Stock',
        out_of_stock: 'Out of Stock',
        pre_order: 'Pre-order'
      },
      sort: {
        popular: 'Most Popular',
        newest: 'Newest First',
        price_low: 'Price: Low to High',
        price_high: 'Price: High to Low',
        rating: 'Highest Rated'
      },
      empty: 'No products found',
      products_count: 'products',
      categories: {
        smartphones: 'Smartphones',
        laptops: 'Laptops',
        tablets: 'Tablets',
        accessories: 'Accessories',
        wearables: 'Wearables',
        audio: 'Audio Devices',
        electronics: 'Electronics',
        computers: 'Computers',
        laptops: 'Laptops',
        desktops: 'Desktop Computers',
        accessories: 'Accessories',
        phones: 'Phones',
        appliances: 'Appliances',
        kitchen: 'Kitchen Appliances',
        refrigerators: 'Refrigerators',
        ovens: 'Ovens',
        dishwashers: 'Dishwashers',
        climate: 'Climate Control',
        air_conditioners: 'Air Conditioners',
        heaters: 'Heaters',
        fans: 'Fans',
        macbook_pro: 'MacBook Pro 14"',
        iphone_14_pro: 'iPhone 14 Pro'
      },
      filters: {
        title: 'Filters',
        categories: 'Categories',
        price: {
          title: 'Price Range',
          min: 'Min Price',
          max: 'Max Price'
        },
        brands: {
          title: 'Brands',
          all: 'All Brands',
          search: 'Search brands'
        },
        colors: {
          title: 'Colors',
          black: 'Black',
          white: 'White',
          gray: 'Gray',
          silver: 'Silver',
          gold: 'Gold',
          red: 'Red',
          blue: 'Blue',
          green: 'Green'
        },
        ratings: {
          title: 'Rating',
          and_up: 'and up',
          reviews: 'reviews',
          no_reviews: 'No reviews yet',
          rate_product: 'Rate this product',
          write_review: 'Write a review',
          verified_purchase: 'Verified Purchase',
          rating_stats: 'Rating Statistics',
          out_of_five: 'out of 5',
          star_rating: '{rating} Star',
          one_star: '1 star',
          two_stars: '2 stars',
          three_stars: '3 stars',
          four_stars: '4 stars',
          five_stars: '5 stars'
        },
        availability: {
          title: 'Availability',
          in_stock: 'In Stock',
          out_of_stock: 'Out of Stock',
          pre_order: 'Pre-order'
        },
        actions: {
          apply: 'Apply Filters',
          clear: 'Clear All',
          close: 'Close Filters'
        }
      },
      categories: {
        smartphones: 'Smartphones',
        tablets: 'Tablets',
        laptops: 'Laptops',
        accessories: 'Accessories'
      },
      
      pagination: {
        prev: 'Previous',
        next: 'Next'
      },
      breadcrumbs: {
        home: 'Home'
      },
      filters: {
        title: 'Filters',
        price: 'Price',
        brand: 'Brand',
        ram: 'RAM',
        storage: 'Storage',
        display: 'Display Size',
        apply: 'Apply Filters',
        clear: 'Clear All'
      }
    },
    settings: {
      title: 'Settings',
      account: {
        title: 'Account',
        language: {
          title: 'Language',
          description: 'Interface language'
        },
        theme: {
          title: 'Theme',
          description: 'Interface appearance',
          light: 'Light',
          dark: 'Dark'
        },
        currency: {
          title: 'Currency',
          description: 'Price display'
        }
      },
      notifications: {
        title: 'Notifications',
        email: {
          title: 'Email notifications',
          description: 'About news and promotions'
        },
        sms: {
          title: 'SMS notifications',
          description: 'About order status'
        }
      },
      privacy: {
        title: 'Privacy & Security',
        two_factor: {
          title: 'Two-factor authentication',
          description: 'For additional security'
        },
        delete_account: 'Delete account'
      },
      save_changes: 'Save Changes'
    },
    orders: {
      title: 'Orders',
      filters: {
        search: 'Search orders',
        status: {
          label: 'Status',
          all: 'All',
          pending: 'Pending',
          processing: 'Processing',
          shipped: 'Shipped',
          delivered: 'Delivered',
          cancelled: 'Cancelled'
        },
        period: {
          label: 'Period',
          all: 'All time',
          today: 'Today',
          week: 'This week',
          month: 'This month'
        }
      },
      order: {
        number: 'Order number',
        date: 'Date',
        total: 'Total',
        payment_method: 'Payment method',
        quantity: 'pcs'
      },
      empty: {
        title: 'No orders found',
        description: 'Try changing your search or filter parameters'
      }
    },
    common: {
      details: 'Details'
    },
    mobileCatalog: {
      brands: 'Brands',
      byPrice: 'By Price',
      ram: 'RAM',
      screenSize: 'Screen Size',
      price: {
        under_1m: 'Under $1,000,000',
        from_1m_to_3m: '$1-3 million',
        from_3m_to_5m: '$3-5 million',
        over_5m: 'Over $5 million'
      },
      categories: {
        smartphones: 'Smartphones',
        tablets: 'Tablets',
        tablet_accessories: 'Tablet Accessories'
      },
      ram_options: {
        gb_4: '4 GB',
        gb_6: '6 GB',
        gb_8: '8 GB',
        gb_12_plus: '12 GB and more'
      },
      screen_size: {
        under_8: 'Under 8"',
        from_8_to_10: '8-10"',
        over_10: 'Over 10"'
      }
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
      hot_deals: 'Горячие предложения',
      promotions: 'Акции',
      catalog: 'Каталог',
      see_all: 'Смотреть все'
    },
    header: {
      search: 'Поиск товаров...',
      cart: 'Корзина',
      login: 'Войти',
      register: 'Регистрация'
    },
    profile: {
      title: 'Мой профиль',
      personal_info: 'Личная информация',
      orders: 'Мои заказы',
      favorites: 'Избранное',
      settings: 'Настройки',
      help: 'Центр помощи',
      logout: 'Выйти',
      first_name: 'Имя',
      last_name: 'Фамилия',
      email: 'Email',
      phone: 'Телефон',
      birthday: 'Дата рождения',
      gender: 'Пол',
      address: 'Адрес',
      select: 'Выберите',
      male: 'Мужской',
      female: 'Женский',
      save: 'Сохранить изменения',
      placeholders: {
        first_name: 'Введите ваше имя',
        last_name: 'Введите вашу фамилию',
        email: 'email@example.com',
        phone: '+998 90 123 45 67',
        address: 'Введите ваш полный адрес'
      }
    },
    favorites: {
      title: 'Избранное',
      category: 'Категория',
      empty: {
        title: 'Ваш список избранного пуст',
        description: 'Добавляйте понравившиеся товары в избранное. Просматривайте их в любое время и легко перемещайте в корзину.',
        button: 'Продолжить покупки'
      },
      remove: 'Удалить',
      add_to_cart: 'В корзину',
      move_all_to_cart: 'Все в корзину',
      clear_all: 'Очистить все',
      items_count: 'товаров',
      item_count: 'товар',
      save_for_later: 'Сохранить на потом',
      price: 'Цена',
      total: 'Итого',
      success: {
        added: 'Добавлено в избранное',
        removed: 'Удалено из избранного',
        moved_to_cart: 'Перемещено в корзину',
        cleared: 'Список избранного очищен'
      },
      recommended: 'Рекомендуемые товары',
      recommended_products: 'Рекомендуемые товары'
    },
    currency: 'РУБ',
    month: 'мес',
    product: {
      about: 'О товаре',
      specifications: 'Характеристики',
      similar: 'Похожие товары',
      add_to_cart: 'В корзину',
      monthly_payment: 'Ежемесячный платеж',
      sale_price: 'Цена со скидкой',
      rating: 'Рейтинг',
      reviews: 'Отзывы',
      orders: 'Заказы',
      colors: 'Цвета',
      sizes: 'Размеры',
      quantity: 'Количество'
    },
    cart: {
      title: 'Корзина',
      empty: 'Ваша корзина пуста',
      total: 'Итого',
      checkout: 'Оформить заказ',
      continue_shopping: 'Продолжить покупки',
      remove: 'Удалить',
      quantity: 'Количество',
      subtotal: 'Подытог',
      shipping: 'Доставка',
      free: 'Бесплатно',
      total_items: 'товаров',
      clear_cart: 'Очистить корзину',
      save_for_later: 'Отложить на потом',
      similar_products: 'Вам может понравиться'
    },
    checkout: {
      title: 'Оформление заказа',
      personal_info: 'Личная информация',
      first_name: 'Имя',
      last_name: 'Фамилия',
      phone: 'Телефон',
      email: 'Эл. почта',
      shipping_method: 'Способ доставки',
      payment_method: 'Способ оплаты',
      order_summary: 'Сводка заказа',
      subtotal: 'Подытог',
      shipping: 'Доставка',
      total: 'Итого',
      quantity: 'Количество',
      free: 'Бесплатно',
      place_order: 'Разместить заказ',
      shipping_methods: {
        standard: {
          title: 'Стандартная доставка',
          description: 'Доставка в течение 3-5 рабочих дней',
          free: 'Бесплатная доставка'
        },
        express: {
          title: 'Экспресс-доставка',
          description: 'Доставка в течение 1-2 рабочих дней',
          price: 'Стоимость экспресс-доставки'
        },
        pickup: {
          title: 'Самовывоз',
          description: 'Забрать из нашего магазина',
          free: 'Бесплатно'
        }
      }
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
        faq: 'FAQ',
        delivery: 'Доставка',
        returns: 'Возврат',
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
    },
    home: {
      popular_products: 'Популярные товары',
      new_products: 'Новые товары',
      view_all: 'Смотреть все'
    },
    categories: {
      electronics: 'Электроника',
      appliances: 'Бытовая техника',
      clothing: 'Одежда',
      footwear: 'Обувь',
      accessories: 'Аксессуары',
      beauty: 'Красота'
    },
    category: {
      title: 'Категории',
      filter: {
        title: 'Фильтры',
        price: 'Цена',
        brand: 'Бренд',
        color: 'Цвет',
        size: 'Размер',
        sort: 'Сортировать по',
        apply: 'Применить фильтры',
        clear: 'Сбросить фильтры',
        price_range: 'Диапазон цен',
        min_price: 'Мин. цена',
        max_price: 'Макс. цена',
        rating: 'Рейтинг',
        rating_and_up: 'и выше',
        availability: 'Наличие',
        in_stock: 'В наличии',
        out_of_stock: 'Нет в наличии',
        pre_order: 'Предзаказ'
      },
      sort: {
        popular: 'Популярные',
        newest: 'Сначала новые',
        price_low: 'Цена: по возрастанию',
        price_high: 'Цена: по убыванию',
        rating: 'По рейтингу'
      },
      empty: 'Товары не найдены',
      products_count: 'товаров',
      categories: {
        smartphones: 'Смартфоны',
        laptops: 'Ноутбуки',
        tablets: 'Планшеты',
        accessories: 'Аксессуары',
        wearables: 'Носимые устройства',
        audio: 'Аудиотехника',
        electronics: 'Электроника',
        computers: 'Компьютеры',
        laptops: 'Ноутбуки',
        desktops: 'Настольные компьютеры',
        accessories: 'Аксессуары',
        phones: 'Телефоны',
        appliances: 'Бытовая техника',
        kitchen: 'Кухонная техника',
        refrigerators: 'Холодильники',
        ovens: 'Духовки',
        dishwashers: 'Посудомоечные машины',
        climate: 'Климатическая техника',
        air_conditioners: 'Кондиционеры',
        heaters: 'Обогреватели',
        fans: 'Вентиляторы',
        macbook_pro: 'MacBook Pro 14"',
        iphone_14_pro: 'iPhone 14 Pro'
      },
      filters: {
        title: 'Фильтры',
        categories: 'Категории',
        price: {
          title: 'Диапазон цен',
          min: 'Мин. цена',
          max: 'Макс. цена'
        },
        brands: {
          title: 'Бренды',
          all: 'Все бренды',
          search: 'Поиск брендов'
        },
        colors: {
          title: 'Цвета',
          black: 'Черный',
          white: 'Белый',
          gray: 'Серый',
          silver: 'Серебристый',
          gold: 'Золотой',
          red: 'Красный',
          blue: 'Синий',
          green: 'Зеленый'
        },
        ratings: {
          title: 'Рейтинг',
          and_up: 'и выше',
          reviews: 'отзывов',
          no_reviews: 'Пока нет отзывов',
          rate_product: 'Оценить товар',
          write_review: 'Написать отзыв',
          verified_purchase: 'Проверенная покупка',
          rating_stats: 'Статистика рейтинга',
          out_of_five: 'из 5',
          star_rating: '{rating} Звезд',
          one_star: '1 звезда',
          two_stars: '2 звезды',
          three_stars: '3 звезды',
          four_stars: '4 звезды',
          five_stars: '5 звезд'
        },
        availability: {
          title: 'Наличие',
          in_stock: 'В наличии',
          out_of_stock: 'Нет в наличии',
          pre_order: 'Предзаказ'
        },
        actions: {
          apply: 'Применить фильтры',
          clear: 'Очистить все',
          close: 'Закрыть фильтры'
        }
      },
      categories: {
        smartphones: 'Smartphones',
        tablets: 'Tablets',
        laptops: 'Laptops',
        accessories: 'Accessories'
      },
      
      pagination: {
        prev: 'Назад',
        next: 'Вперед'
      },
      breadcrumbs: {
        home: 'Home'
      },
      filters: {
        title: 'Filters',
        price: 'Price',
        brand: 'Brand',
        ram: 'RAM',
        storage: 'Storage',
        display: 'Display Size',
        apply: 'Apply Filters',
        clear: 'Clear All'
      }
    },
    settings: {
      title: 'Настройки',
      account: {
        title: 'Аккаунт',
        language: {
          title: 'Язык',
          description: 'Язык интерфейса'
        },
        theme: {
          title: 'Тема',
          description: 'Внешний вид интерфейса',
          light: 'Светлая',
          dark: 'Темная'
        },
        currency: {
          title: 'Валюта',
          description: 'Отображение цен'
        }
      },
      notifications: {
        title: 'Уведомления',
        email: {
          title: 'Email уведомления',
          description: 'О новостях и акциях'
        },
        sms: {
          title: 'SMS уведомления',
          description: 'О статусе заказа'
        }
      },
      privacy: {
        title: 'Конфиденциальность и безопасность',
        two_factor: {
          title: 'Двухфакторная аутентификация',
          description: 'Для дополнительной безопасности'
        },
        delete_account: 'Удалить аккаунт'
      },
      save_changes: 'Сохранить изменения'
    },
    orders: {
      title: 'Заказы',
      filters: {
        search: 'Поиск заказов',
        status: {
          label: 'Статус',
          all: 'Все',
          pending: 'Ожидается',
          processing: 'В обработке',
          shipped: 'Отправлено',
          delivered: 'Доставлено',
          cancelled: 'Отменено'
        },
        period: {
          label: 'Период',
          all: 'Все время',
          today: 'Сегодня',
          week: 'Эта неделя',
          month: 'Этот месяц'
        }
      },
      order: {
        number: 'Номер заказа',
        date: 'Дата',
        total: 'Итого',
        payment_method: 'Способ оплаты',
        quantity: 'шт'
      },
      empty: {
        title: 'Заказы не найдены',
        description: 'Попробуйте изменить параметры поиска или фильтры'
      }
    },
    common: {
      details: 'Подробнее'
    },
    mobileCatalog: {
      brands: 'Бренды',
      byPrice: 'По цене',
      ram: 'Оперативная память',
      screenSize: 'Размер экрана',
      price: {
        under_1m: 'До 1 000 000',
        from_1m_to_3m: '1-3 миллиона',
        from_3m_to_5m: '3-5 миллионов',
        over_5m: 'Более 5 миллионов'
      },
      categories: {
        smartphones: 'Смартфоны',
        tablets: 'Планшеты',
        tablet_accessories: 'Аксессуары для планшетов'
      },
      ram_options: {
        gb_4: '4 ГБ',
        gb_6: '6 ГБ',
        gb_8: '8 ГБ',
        gb_12_plus: '12 ГБ и более'
      },
      screen_size: {
        under_8: 'До 8"',
        from_8_to_10: '8-10"',
        over_10: 'Более 10"'
      }
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
      hot_deals: 'Qaynoq takliflar',
      promotions: 'Aksiyalar',
      catalog: 'Katalog',
      see_all: 'Barchasini ko\'rish'
    },
    header: {
      search: 'Mahsulotlarni qidirish...',
      cart: 'Savatcha',
      login: 'Kirish',
      register: 'Ro\'yxatdan o\'tish'
    },
    profile: {
      title: 'Mening profilim',
      personal_info: 'Shaxsiy ma\'lumotlar',
      orders: 'Mening buyurtmalarim',
      favorites: 'Sevimlilar',
      settings: 'Sozlamalar',
      help: 'Yordam markazi',
      logout: 'Chiqish',
      first_name: 'Ism',
      last_name: 'Familiya',
      email: 'Email',
      phone: 'Telefon',
      birthday: 'Tug\'ilgan sana',
      gender: 'Jins',
      address: 'Manzil',
      select: 'Tanlang',
      male: 'Erkak',
      female: 'Ayol',
      save: 'O\'zgarishlarni saqlash',
      placeholders: {
        first_name: 'Ismingizni kiriting',
        last_name: 'Familiyangizni kiriting',
        email: 'email@example.com',
        phone: '+998 90 123 45 67',
        address: 'To\'liq manzilingizni kiriting'
      }
    },
    favorites: {
      title: 'Sevimlilar',
      category: 'Kategoriya',
      empty: {
        title: 'Sevimlilar ro\'yxati bo\'sh',
        description: 'Yoqtirgan mahsulotlaringizni sevimlilarga qo\'shing. Ularni istalgan vaqtda ko\'rib chiqing va savatga osongina o\'tkazing.',
        button: 'Xarid qilishni davom ettirish'
      },
      remove: 'O\'chirish',
      add_to_cart: 'Savatga qo\'shish',
      move_all_to_cart: 'Hammasini savatga',
      clear_all: 'Hammasini tozalash',
      items_count: 'ta mahsulot',
      item_count: 'ta mahsulot',
      save_for_later: 'Keyinroq uchun saqlash',
      price: 'Narx',
      total: 'Jami',
      success: {
        added: 'Sevimlilarga qo\'shildi',
        removed: 'Sevimlilardan o\'chirildi',
        moved_to_cart: 'Savatga o\'tkazildi',
        cleared: 'Sevimlilar ro\'yxati tozalandi'
      },
      recommended: 'Tavsiya etilgan mahsulotlar',
      recommended_products: 'Tavsiya etilgan mahsulotlar'
    },
    currency: 'so\'m',
    month: 'oy',
    product: {
      about: 'Mahsulot haqida',
      specifications: 'Xususiyatlari',
      similar: 'O\'xshash mahsulotlar',
      add_to_cart: 'Savatga qo\'shish',
      monthly_payment: 'Oylik to\'lov',
      sale_price: 'Aksiya narxi',
      rating: 'Reyting',
      reviews: 'Sharhlar',
      orders: 'Buyurtmalar',
      colors: 'Ranglar',
      sizes: 'O\'lchamlar',
      quantity: 'Soni'
    },
    cart: {
      title: 'Savat',
      empty: 'Savatingiz bo\'sh',
      total: 'Jami',
      checkout: 'Buyurtma berish',
      continue_shopping: 'Xarid qilishni davom ettirish',
      remove: 'O\'chirish',
      quantity: 'Soni',
      subtotal: 'Oraliq summa',
      shipping: 'Yetkazib berish',
      free: 'Bepul',
      total_items: 'ta mahsulot',
      clear_cart: 'Savatni tozalash',
      save_for_later: 'Keyinroqqa saqlash',
      similar_products: 'Sizga yoqishi mumkin'
    },
    checkout: {
      title: 'Checkout',
      personal_info: 'Personal Information',
      first_name: 'First Name',
      last_name: 'Last Name',
      phone: 'Phone Number',
      email: 'Email',
      shipping_method: 'Shipping Method',
      payment_method: 'Payment Method',
      order_summary: 'Order Summary',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      total: 'Total',
      quantity: 'Quantity',
      free: 'Free',
      place_order: 'Place Order',
      shipping_methods: {
        standard: {
          title: 'Standard Delivery',
          description: '3-5 business days',
          free: 'Free Shipping'
        },
        express: {
          title: 'Express Delivery',
          description: '1-2 business days',
          price: '50,000 UZS'
        },
        pickup: {
          title: 'Store Pickup',
          description: 'Available today',
          free: 'Free'
        }
      }
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
        faq: 'FAQ',
        delivery: 'Yetkazib berish',
        returns: 'Qaytarish',
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
    },
    home: {
      popular_products: 'Ommabop mahsulotlar',
      new_products: 'Yangi mahsulotlar',
      view_all: 'Barchasini ko\'rish'
    },
    categories: {
      electronics: 'Elektronika',
      appliances: 'Maishiy texnika',
      clothing: 'Kiyimlar',
      footwear: 'Poyabzallar',
      accessories: 'Aksessuarlar',
      beauty: 'Go\'zallik'
    },
    category: {
      title: 'Kategoriyalar',
      filter: {
        title: 'Filtrlar',
        price: 'Narx',
        brand: 'Brend',
        color: 'Rang',
        size: 'O\'lcham',
        sort: 'Saralash',
        apply: 'Filtrlarni qo\'llash',
        clear: 'Filtrlarni tozalash',
        price_range: 'Narx oralig\'i',
        min_price: 'Min narx',
        max_price: 'Maks narx',
        rating: 'Reyting',
        rating_and_up: 'va undan yuqori',
        availability: 'Mavjudligi',
        in_stock: 'Sotuvda bor',
        out_of_stock: 'Sotuvda yo\'q',
        pre_order: 'Oldindan buyurtma'
      },
      sort: {
        popular: 'Ommabop',
        newest: 'Eng yangi',
        price_low: 'Narx: arzondan qimmatga',
        price_high: 'Narx: qimmatdan arzonga',
        rating: 'Reyting bo\'yicha'
      },
      empty: 'Mahsulotlar topilmadi',
      products_count: 'ta mahsulot',
      categories: {
        smartphones: 'Smartfonlar',
        laptops: 'Noutbuklar',
        tablets: 'Planshetlar',
        accessories: 'Aksessuarlar',
        wearables: 'Kiyiladigan qurilmalar',
        audio: 'Audio qurilmalar',
        electronics: 'Elektronika',
        computers: 'Kompyuterlar',
        laptops: 'Noutbuklar',
        desktops: 'Stol kompyuterlari',
        accessories: 'Aksessuarlar',
        phones: 'Telefonlar',
        appliances: 'Maishiy texnika',
        kitchen: 'Oshxona texnikasi',
        refrigerators: 'Muzlatkichlar',
        ovens: 'Pechlar',
        dishwashers: 'Idish yuvish mashinalari',
        climate: 'Iqlim texnikasi',
        air_conditioners: 'Konditsionerlar',
        heaters: 'Isitgichlar',
        fans: 'Ventilyatorlar',
        macbook_pro: 'MacBook Pro 14"',
        iphone_14_pro: 'iPhone 14 Pro'
      },
      filters: {
        title: 'Filtrlar',
        categories: 'Kategoriyalar',
        price: {
          title: 'Narx oralig\'i',
          min: 'Min narx',
          max: 'Maks narx'
        },
        brands: {
          title: 'Brendlar',
          all: 'Barcha brendlar',
          search: 'Brendlarni qidirish'
        },
        colors: {
          title: 'Ranglar',
          black: 'Qora',
          white: 'Oq',
          gray: 'Kulrang',
          silver: 'Kumushrang',
          gold: 'Oltin rang',
          red: 'Qizil',
          blue: 'Ko\'k',
          green: 'Yashil'
        },
        ratings: {
          title: 'Reyting',
          and_up: 'va undan yuqori',
          reviews: 'sharhlar',
          no_reviews: 'Sharhlar yo\'q',
          rate_product: 'Mahsulotni baholash',
          write_review: 'Sharh yozish',
          verified_purchase: 'Tasdiqlangan xarid',
          rating_stats: 'Reyting statistikasi',
          out_of_five: 'dan 5',
          star_rating: '{rating} Yulduz',
          one_star: '1 yulduz',
          two_stars: '2 yulduz',
          three_stars: '3 yulduz',
          four_stars: '4 yulduz',
          five_stars: '5 yulduz'
        },
        availability: {
          title: 'Mavjudligi',
          in_stock: 'Sotuvda bor',
          out_of_stock: 'Sotuvda yo\'q',
          pre_order: 'Oldindan buyurtma'
        },
        actions: {
          apply: 'Filtrlarni qo\'llash',
          clear: 'Tozalash',
          close: 'Filtrlarni yopish'
        }
      },
      categories: {
        smartphones: 'Smartphones',
        tablets: 'Tablets',
        laptops: 'Laptops',
        accessories: 'Accessories'
      },
     
      pagination: {
        prev: 'Orqaga',
        next: 'Oldinga'
      },
      
      
    },
    settings: {
      title: 'Sozlamalar',
      account: {
        title: 'Akkaunt',
        language: {
          title: 'Til',
          description: 'Interfeys tili'
        },
        theme: {
          title: 'Mavzu',
          description: 'Interfeys ko\'rinishi',
          light: 'Yorug\'',
          dark: 'Qorong\'i'
        },
        currency: {
          title: 'Valyuta',
          description: 'Narxlarni ko\'rsatish'
        }
      },
      notifications: {
        title: 'Bildirishnomalar',
        email: {
          title: 'Email xabarnomalar',
          description: 'Yangiliklar va aksiyalar haqida'
        },
        sms: {
          title: 'SMS xabarnomalar',
          description: 'Buyurtma holati haqida'
        }
      },
      privacy: {
        title: 'Maxfiylik va xavfsizlik',
        two_factor: {
          title: 'Ikki bosqichli autentifikatsiya',
          description: 'Qo\'shimcha xavfsizlik uchun'
        },
        delete_account: 'Akkauntni o\'chirish'
      },
      save_changes: 'O\'zgarishlarni saqlash'
    },
    orders: {
      title: 'Buyurtmalar',
      filters: {
        search: 'Buyurtmalarni qidirish',
        status: {
          label: 'Holat',
          all: 'Barchasi',
          pending: 'Kutilmoqda',
          processing: 'Jarayonda',
          shipped: 'Yuborilgan',
          delivered: 'Yetkazilgan',
          cancelled: 'Bekor qilingan'
        },
        period: {
          label: 'Davr',
          all: 'Barcha vaqt',
          today: 'Bugun',
          week: 'Shu hafta',
          month: 'Shu oy'
        }
      },
      order: {
        number: 'Buyurtma raqami',
        date: 'Sana',
        total: 'Jami',
        payment_method: 'To\'lov usuli',
        quantity: 'dona'
      },
      empty: {
        title: 'Buyurtmalar topilmadi',
        description: 'Qidiruv yoki filtr parametrlarini o\'zgartirib ko\'ring'
      }
    },
    common: {
      details: 'Batafsil'
    },
    mobileCatalog: {
      brands: 'Brendlar',
      byPrice: 'Narx bo\'yicha',
      ram: 'Operativ xotira',
      screenSize: 'Ekran o\'lchami',
      price: {
        under_1m: '1 000 000 so\'mgacha',
        from_1m_to_3m: '1-3 million so\'m',
        from_3m_to_5m: '3-5 million so\'m',
        over_5m: '5 million so\'mdan yuqori'
      },
      categories: {
        smartphones: 'Smartfonlar',
        tablets: 'Planshetlar',
        tablet_accessories: 'Planshet aksessuarlari'
      },
      ram_options: {
        gb_4: '4 GB',
        gb_6: '6 GB',
        gb_8: '8 GB',
        gb_12_plus: '12 GB va undan yuqori'
      },
      screen_size: {
        under_8: '8" gacha',
        from_8_to_10: '8-10"',
        over_10: '10" dan yuqori'
      }
    }
  }
}

export default createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'uz',
  fallbackLocale: 'uz',
  messages,
  globalInjection: true,
  silentTranslationWarn: true
})

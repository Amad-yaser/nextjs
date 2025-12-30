export const languages = {
  ar: { name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  en: { name: 'English', flag: '🇺🇸', dir: 'ltr' },
  fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr' }
};

export type Language = keyof typeof languages;

export const translations = {
  ar: {
    // Navigation
    nav: {
      home: 'الرئيسية',
      websites: 'المواقع',
      services: 'الخدمات',
      about: 'من نحن',
      contact: 'اتصل بنا',
      admin: 'لوحة التحكم'
    },
    // Hero Section
    hero: {
      title: 'اكتشف <span>مواقع</span> و<span>خدمات</span> رائعة',
      subtitle: 'المنصة النهائية لعرض المواقع المميزة والقوالب والخدمات الرقمية',
      searchPlaceholder: 'ابحث عن مواقع أو خدمات...',
      contactUs: 'اتصل بنا'
    },
    // Categories
    categories: {
      all: 'جميع الفئات',
      ecommerce: 'التجارة الإلكترونية',
      portfolio: 'معارض الأعمال',
      blog: 'المدونات',
      saas: 'البرمجيات',
      restaurant: 'المطاعم'
    },
    // Services
    services: {
      development: 'تطوير مخصص',
      developmentDesc: 'مواقع ويب مصممة خصيصاً وفقاً لمواصفاتك',
      design: 'تصميم واجهة المستخدم',
      designDesc: 'تصاميم جميلة تحول الزوار إلى عملاء',
      mobile: 'تطبيقات الجوال',
      mobileDesc: 'تطبيقات جوال أصلية ومتعددة المنصات',
      marketing: 'التسويق الرقمي',
      marketingDesc: 'خدمات تحسين محركات البحث والوسائط الاجتماعية والتسويق بالمحتوى'
    },
    // Stats
    stats: {
      websites: 'موقع معروض',
      providers: 'مزود خدمة',
      customers: 'عميل سعيد',
      rating: 'متوسط التقييم'
    },
    // News Bar
    news: {
      offer1: 'عروض حصرية: خصم 20% على جميع المواقع هذا الشهر!',
      offer2: 'إطلاق منصة جديدة قريباً!',
      offer3: 'تطبيقات الجوال الآن متوفرة!'
    },
    // Common
    common: {
      viewDetails: 'معاينة',
      featured: 'مميز',
      bestSeller: 'الأكثر مبيعاً',
      trending: 'رائج',
      provider: 'المزود',
      rating: 'التقييم',
      reviews: 'تقييمات',
      search: 'بحث',
      filter: 'فلتر',
      all: 'الكل',
      loading: 'جاري التحميل...',
      error: 'حدث خطأ ما',
      retry: 'إعادة المحاولة'
    }
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      websites: 'Websites',
      services: 'Services',
      about: 'About',
      contact: 'Contact',
      admin: 'Admin'
    },
    // Hero Section
    hero: {
      title: 'Discover Amazing <span>Websites</span> & <span>Services</span>',
      subtitle: 'The ultimate platform for showcasing premium websites, templates, and digital services',
      searchPlaceholder: 'Search for websites or services...',
      contactUs: 'Contact Us'
    },
    // Categories
    categories: {
      all: 'All Categories',
      ecommerce: 'E-commerce',
      portfolio: 'Portfolio',
      blog: 'Blog',
      saas: 'SaaS',
      restaurant: 'Restaurant'
    },
    // Services
    services: {
      development: 'Custom Development',
      developmentDesc: 'Websites tailored to your specifications',
      design: 'UI/UX Design',
      designDesc: 'Beautiful designs that convert visitors to customers',
      mobile: 'Mobile Apps',
      mobileDesc: 'Native and cross-platform mobile applications',
      marketing: 'Digital Marketing',
      marketingDesc: 'SEO, social media, and content marketing services'
    },
    // Stats
    stats: {
      websites: 'Websites Listed',
      providers: 'Service Providers',
      customers: 'Happy Customers',
      rating: 'Average Rating'
    },
    // News Bar
    news: {
      offer1: 'Exclusive Offers: 20% off all websites this month!',
      offer2: 'New platform launching soon!',
      offer3: 'Mobile apps now available!'
    },
    // Common
    common: {
      viewDetails: 'Preview',
      featured: 'Featured',
      bestSeller: 'Best Seller',
      trending: 'Trending',
      provider: 'Provider',
      rating: 'Rating',
      reviews: 'Reviews',
      search: 'Search',
      filter: 'Filter',
      all: 'All',
      loading: 'Loading...',
      error: 'Something went wrong',
      retry: 'Retry'
    }
  },
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      websites: 'Sites Web',
      services: 'Services',
      about: 'À Propos',
      contact: 'Contact',
      admin: 'Admin'
    },
    // Hero Section
    hero: {
      title: 'Découvrez des <span>Sites Web</span> et <span>Services</span> Incroyables',
      subtitle: 'La plateforme ultime pour présenter des sites web premium, des modèles et des services numériques',
      searchPlaceholder: 'Rechercher des sites web ou services...',
      contactUs: 'Contactez-nous'
    },
    // Categories
    categories: {
      all: 'Toutes les Catégories',
      ecommerce: 'E-commerce',
      portfolio: 'Portfolio',
      blog: 'Blog',
      saas: 'SaaS',
      restaurant: 'Restaurant'
    },
    // Services
    services: {
      development: 'Développement Personnalisé',
      developmentDesc: 'Sites web adaptés à vos spécifications',
      design: 'Design UI/UX',
      designDesc: 'De magnifiques designs qui transforment les visiteurs en clients',
      mobile: 'Applications Mobiles',
      mobileDesc: 'Applications mobiles natives et multiplateformes',
      marketing: 'Marketing Digital',
      marketingDesc: 'Services SEO, médias sociaux et marketing de contenu'
    },
    // Stats
    stats: {
      websites: 'Sites Web Listés',
      providers: 'Prestataires de Services',
      customers: 'Clients Satisfaits',
      rating: 'Note Moyenne'
    },
    // News Bar
    news: {
      offer1: 'Offres Exclusives: 20% de réduction sur tous les sites web ce mois-ci!',
      offer2: 'Nouvelle plateforme en cours de lancement!',
      offer3: 'Applications mobiles maintenant disponibles!'
    },
    // Common
    common: {
      viewDetails: 'Aperçu',
      featured: 'En Vedette',
      bestSeller: 'Meilleure Vente',
      trending: 'Tendance',
      provider: 'Prestataire',
      rating: 'Note',
      reviews: 'Avis',
      search: 'Rechercher',
      filter: 'Filtrer',
      all: 'Tout',
      loading: 'Chargement...',
      error: 'Une erreur est survenue',
      retry: 'Réessayer'
    }
  }
};

export function useTranslation(language: Language) {
  return translations[language];
}

export function getDirection(language: Language): 'rtl' | 'ltr' {
  return languages[language].dir;
}
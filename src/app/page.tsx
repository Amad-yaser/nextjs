'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Search, Star, ShoppingCart, Globe, Code, Palette, Smartphone, TrendingUp, Users, Clock, CheckCircle, ArrowRight, ChevronLeft, ChevronRight, Play, Pause, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LanguageSelector } from '@/components/LanguageSelector';
import { CurrencySelector } from '@/components/CurrencySelector';
import { PaymentMethods } from '@/components/PaymentMethods';
import { useLanguage } from '@/hooks/useLanguage';
import GlobalSearch from '@/components/ui/global-search';
import { AnimatePresence, motion } from 'framer-motion';

// Image Carousel Component for Home Page
function ImageCarousel({ images, title }: { images: string[], title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <ImageIcon className="h-12 w-12 text-gray-400" />
      </div>
    );
  }

  return (
    <div className="relative group" dir="ltr">
      <div className="aspect-video overflow-hidden rounded-lg">
        <img
          src={images[currentIndex]}
          alt={`${title} - صورة ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
      </div>
      
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="الصورة السابقة"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="الصورة التالية"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-2 left-2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label={isPlaying ? "إيقاف" : "تشغيل"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                }`}
                aria-label={`الانتقال إلى الصورة ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [backgroundImages, setBackgroundImages] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<number>>(new Set());
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [featuredWebsites, setFeaturedWebsites] = useState<any[]>([]);
  const { language, t, dir } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut for global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Trigger global search - this would need to be wired up to the GlobalSearch component
        const searchEvent = new CustomEvent('openGlobalSearch');
        window.dispatchEvent(searchEvent);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    fetchBackgroundImages();
    fetchNewsItems();
    fetchFeaturedWebsites();
  }, []);

  useEffect(() => {
    if (backgroundImages.length > 0 && !isPaused) {
      const interval = setInterval(() => {
        setCurrentBgIndex((prev) => {
          let nextIndex = (prev + 1) % backgroundImages.length;
          // 跳过加载失败的图片
          while (imageLoadErrors.has(nextIndex) && nextIndex !== prev) {
            nextIndex = (nextIndex + 1) % backgroundImages.length;
            if (nextIndex === prev) break; // 避免无限循环
          }
          return nextIndex;
        });
      }, 8000); // 每8秒切换一次
      return () => clearInterval(interval);
    }
  }, [backgroundImages, isPaused, imageLoadErrors]);

  // 键盘控制
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentBgIndex((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [backgroundImages.length]);

  const fetchBackgroundImages = async () => {
    try {
      const response = await fetch('/api/admin/background-images');
      const images = await response.json();
      // Extract URLs from the image objects
      const imageUrls = images.map((img: any) => img.url);
      setBackgroundImages(imageUrls);
      setImageLoadErrors(new Set()); // 重置错误状态
    } catch (error) {
      console.error('Failed to fetch background images:', error);
    }
  };

  const fetchNewsItems = async () => {
    try {
      const response = await fetch('/api/admin/news');
      const items = await response.json();
      setNewsItems(items.filter((item: any) => item.active));
    } catch (error) {
      console.error('Failed to fetch news items:', error);
    }
  };

  const fetchFeaturedWebsites = async () => {
    try {
      const response = await fetch('/api/websites');
      const websites = await response.json();
      const ordered = websites.sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
      setFeaturedWebsites(ordered.slice(0, 6));
    } catch (error) {
      console.error('Failed to fetch featured websites:', error);
    }
  };

  const handleImageError = (index: number) => {
    setImageLoadErrors((prev) => new Set(prev).add(index));
    // 如果当前图片加载失败，自动切换到下一张
    if (index === currentBgIndex) {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }
  };

  const handleImageLoad = (index: number) => {
    setImageLoadErrors((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  const goToPrevious = () => {
    setCurrentBgIndex((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length);
  };

  const goToNext = () => {
    setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
  };

  const navItems = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.websites, href: '/websites' },
    { name: t.nav.services, href: '/services' },
    { name: t.nav.about, href: '/about' },
    { name: t.nav.contact, href: '/contact' },
    // { name: 'الإدارة', href: '/admin' } 
  ];

  const categories = [
    { id: 'all', name: t.categories.all, icon: <Globe className="w-5 h-5" /> },
    { id: 'ecommerce', name: t.categories.ecommerce, icon: <ShoppingCart className="w-5 h-5" /> },
    { id: 'portfolio', name: t.categories.portfolio, icon: <Palette className="w-5 h-5" /> },
    { id: 'blog', name: t.categories.blog, icon: <Code className="w-5 h-5" /> },
    { id: 'saas', name: t.categories.saas, icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'restaurant', name: t.categories.restaurant, icon: <Users className="w-5 h-5" /> }
  ];

  const services = [
    {
      icon: <Code className="w-8 h-8 text-green-600" />,
      title: t.services.development,
      description: t.services.developmentDesc
    },
    {
      icon: <Palette className="w-8 h-8 text-green-600" />,
      title: t.services.design,
      description: t.services.designDesc
    },
    {
      icon: <Smartphone className="w-8 h-8 text-green-600" />,
      title: t.services.mobile,
      description: t.services.mobileDesc
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: t.services.marketing,
      description: t.services.marketingDesc
    }
  ];

  const stats = [
    { number: '1,200+', label: t.stats.websites },
    { number: '350+', label: t.stats.providers },
    { number: '15,000+', label: t.stats.customers },
    { number: '4.8/5', label: t.stats.rating }
  ];

  const filteredWebsites = featuredWebsites.filter(website => {
    const matchesCategory = selectedCategory === 'all' || website.category === selectedCategory;
    const matchesSearch = website.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (website.description && website.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white" dir={dir}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="CIAR" className="w-8 h-8" />
              <span className={`text-2xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'} font-arabic-heading`}>
                CIAR
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      scrolled 
                        ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' 
                        : 'text-white hover:text-gray-200 hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <GlobalSearch className="border-0 bg-transparent text-white hover:bg-white/10" />
              </div>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-4 space-x-reverse">
                <LanguageSelector />
                <CurrencySelector />
                <Link href="/contact">
                  <Button className="bg-orange-500 text-white hover:bg-orange-600 font-arabic-modern font-semibold">
                    {t.nav.contact}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={scrolled ? 'text-gray-700' : 'text-white'}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-40"
            >
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, x: '-90%', scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: '-85%', scale: 0.95 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="absolute top-0 bottom-0 left-0 w-[85vw] max-w-sm rounded-r-[32px] bg-white/95 dark:bg-gray-900/95 shadow-2xl border border-white/30 dark:border-gray-800 overflow-hidden"
              >
                <div className="px-5 pt-8 pb-10 space-y-3 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm uppercase tracking-[0.2em] text-gray-500">قائمة التنقل</p>
                    <span className="text-xs text-gray-400">Swipe down to close</span>
                  </div>
                  <div className="space-y-1 flex-1 overflow-y-auto pr-1">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * index }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-4 py-3 rounded-2xl bg-gradient-to-r from-white/60 to-white/30 dark:from-gray-900/60 dark:to-gray-900/20 border border-white/40 dark:border-gray-800 text-base font-medium text-gray-800 dark:text-gray-100 hover:shadow-lg transition"
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-white/40 dark:border-gray-800 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 rounded-2xl bg-white/60 dark:bg-gray-900/60 border border-white/40 dark:border-gray-800 p-3">
                        <LanguageSelector />
                      </div>
                      <div className="flex-1 rounded-2xl bg-white/60 dark:bg-gray-900/60 border border-white/40 dark:border-gray-800 p-3">
                        <CurrencySelector />
                      </div>
                    </div>
                    <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white text-base font-semibold shadow-lg shadow-orange-500/30">
                        {t.nav.contact}
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* News Bar */}
        <div className="bg-green-600 text-white py-2 px-4 overflow-hidden">
          <div className="relative">
            <div className="flex animate-scroll-rtl">
              <div className="flex items-center space-x-2 space-x-reverse px-4">
                {newsItems.map((item, index) => (
                  <div key={item.id} className="flex items-center">
                    <span className="text-sm font-semibold">{item.icon}</span>
                    <span className="text-sm font-semibold mr-2">{item.text}</span>
                    {index < newsItems.length - 1 && (
                      <span className="text-sm font-semibold mx-2">|</span>
                    )}
                  </div>
                ))}
              </div>
              {/* Duplicate for seamless scrolling */}
              <div className="flex items-center space-x-2 space-x-reverse px-4">
                {newsItems.map((item, index) => (
                  <div key={`duplicate-${item.id}`} className="flex items-center">
                    <span className="text-sm font-semibold">{item.icon}</span>
                    <span className="text-sm font-semibold mr-2">{item.text}</span>
                    {index < newsItems.length - 1 && (
                      <span className="text-sm font-semibold mx-2">|</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 pt-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        {backgroundImages.length > 0 && (
          <>
            {backgroundImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-3000 ease-in-out ${
                  index === currentBgIndex && !imageLoadErrors.has(index) 
                    ? 'opacity-50 scale-100 animate-fade-in' 
                    : 'opacity-0 scale-110'
                }`}
                style={{ display: imageLoadErrors.has(index) ? 'none' : 'block' }}
              >
                <img
                  src={image}
                  alt={`خلفية ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(index)}
                  onLoad={() => handleImageLoad(index)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
            ))}
            
            {/* Animated overlay effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-transparent to-green-600/20 animate-pulse"></div>
            
            {/* لوحة التحكم */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-20 animate-slide-up">
              <button
                onClick={goToPrevious}
                className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
                aria-label="الصورة السابقة"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex gap-2 bg-white/10 backdrop-blur-sm p-2 rounded-full">
                {backgroundImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBgIndex(index)}
                    className={`h-2 rounded-full transition-all duration-500 hover:scale-125 ${
                      index === currentBgIndex 
                        ? 'bg-white w-8 opacity-100 shadow-lg' 
                        : 'bg-white/50 hover:bg-white/70 w-2'
                    }`}
                    aria-label={`الانتقال إلى الصورة ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={goToNext}
                className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
                aria-label="الصورة التالية"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* زر التشغيل/الإيقاف */}
            <div className="absolute top-32 left-8 z-20 animate-slide-up">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="bg-white/20 backdrop-blur-sm p-4 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
                aria-label={isPaused ? "تشغيل العرض" : "إيقاف العرض"}
              >
                {isPaused ? (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* عداد الصور */}
            <div className="absolute top-32 right-8 z-20 animate-slide-up">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white text-sm font-medium">
                  {currentBgIndex + 1} / {backgroundImages.length}
                </span>
              </div>
            </div>
            
            {/* مؤشر الحالة */}
            {isPaused && (
              <div className="absolute top-48 left-8 z-20 animate-slide-up">
                <div className="bg-yellow-500/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-white text-sm font-medium">
                    متوقف
                  </span>
                </div>
              </div>
            )}
          </>
        )}
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 animate-slide-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-arabic-heading text-shadow-lg" dangerouslySetInnerHTML={{ __html: t.hero.title }} />
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-3xl mx-auto font-arabic-modern text-shadow reading-optimized">
            {t.hero.subtitle}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={t.hero.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-12 pl-4 py-3 text-lg bg-white/90 backdrop-blur-sm border-0 font-arabic-modern text-right"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/websites">
              <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-arabic-modern font-semibold">
                استعرض المواقع
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 font-arabic-modern font-semibold">
                استكشف الخدمات
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2 font-arabic-heading">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-arabic-modern">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-arabic-heading">
              تصفح حسب الفئة
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-arabic-modern reading-optimized">
              اعثر بالضبط على ما تحتاجه من مجموعة واسعة من الفئات
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`flex flex-col items-center p-4 h-auto space-y-2 font-arabic-modern ${
                  selectedCategory === category.id ? "bg-yellow-500 text-white hover:bg-yellow-600" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.icon}
                <span className="text-sm">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Ciar Websites */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-arabic-heading">
              مشاريع Ciar المميزة
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-arabic-modern reading-optimized">
              أحدث مشاريع شركة Ciar التي نفذناها لعملائنا الكرام
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWebsites.map((website) => (
              <Card key={website.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <ImageCarousel 
                    images={website.images || [website.image || '/template-portfolio.jpg']} 
                    title={website.title} 
                  />
                  {website.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-yellow-500 text-white">
                        مميز
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">مشروع مكتمل</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                      {website.category}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <ImageIcon className="w-3 h-3 ml-1" />
                      <span>{website.images?.length || 1} صور</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 font-arabic-heading">
                    {website.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 font-arabic-modern reading-optimized">
                    {website.description}
                  </p>
                  
                  {website.technologies && website.technologies.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {website.technologies.slice(0, 3).map((tech, index) => (
                          <span 
                            key={index}
                            className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {website.technologies.length > 3 && (
                          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            +{website.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1 bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-arabic-modern font-semibold"
                      onClick={() => window.open(website.url, '_blank')}
                    >
                      زيارة الموقع
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/websites">
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 font-arabic-modern font-semibold">
                عرض جميع مشاريع Ciar
                <ArrowRight className="w-4 h-4 mr-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-arabic-heading">
              الخدمات الاحترافية
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-arabic-modern reading-optimized">
              احصل على مساعدة الخبراء من مزودي الخدمات الموثوقين
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 font-arabic-heading">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 font-arabic-modern reading-optimized">
                    {service.description}
                  </p>
                  <Link href="/services">
                    <Button variant="outline" className="mt-4 font-arabic-modern font-semibold">
                      اعرف المزيد
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 1. Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-arabic-heading">
              آراء العملاء
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-arabic-modern reading-optimized">
              ماذا يقول عملاؤنا عن تجربتهم معنا
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "أحمد محمد",
                role: "مدير شركة تجارة إلكترونية",
                content: "خدمة ممتازة وفريق محترف. ساعدونا في تطوير متجر إلكتروني متكامل زاد مبيعاتنا بنسبة 150%.",
                rating: 5
              },
              {
                name: "فاطمة العلي",
                role: "مصممة جرافيك",
                content: "منصة رائعة لعرض أعمالي. سهولة الاستخدام والدعم الفني ممتاز.",
                rating: 5
              },
              {
                name: "خالد السعيد",
                role: "صاحب مطعم",
                content: "حلول مبتكرة احترافية. موقع المطعم الجذاب زاد عدد الحجوزات بنسبة 200%.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 font-arabic-modern reading-optimized">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full ml-4"></div>
                    <div>
                      <h4 className="font-semibold font-arabic-modern">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500 font-arabic-modern">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-arabic-heading">
              لماذا تختارنا؟
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-arabic-modern reading-optimized">
              نقدم أفضل الحلول الرقمية لتنمية أعمالك
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <CheckCircle className="w-8 h-8 text-green-500" />, title: "جودة عالية", desc: "معايير جودة صارمة في كل مشروع" },
              { icon: <Clock className="w-8 h-8 text-blue-500" />, title: "تسليم سريع", desc: "التزام بالمواعيد النهائية المحددة" },
              { icon: <Users className="w-8 h-8 text-purple-500" />, title: "دعم 24/7", desc: "فريق دعم متخصص على مدار الساعة" },
              { icon: <TrendingUp className="w-8 h-8 text-orange-500" />, title: "نتائج مضمونة", desc: "تحقيق أهداف عملائنا بنجاح" }
            ].map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 font-arabic-modern">{feature.title}</h3>
                  <p className="text-gray-600 font-arabic-modern reading-optimized">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Process Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-arabic-heading">
              كيف نعمل
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-arabic-modern reading-optimized">
              عملية عمل بسيطة وفعالة لتحقيق أهدافك
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "استشارة", desc: "فهم متطلباتك وأهدافك" },
              { step: "2", title: "تخطيط", desc: "وضع خطة عمل مفصلة" },
              { step: "3", title: "تنفيذ", desc: "تطوير الحلول المخصصة" },
              { step: "4", title: "تسليم", desc: "تسليم المشروع ودعم مستمر" }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 font-arabic-modern">{process.title}</h3>
                <p className="text-gray-600 font-arabic-modern reading-optimized">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Technology Stack */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-arabic-heading">
              التقنيات التي نستخدمها
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-arabic-modern reading-optimized">
              أحدث التقنيات لضمان أفضل النتائج
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              "React", "Next.js", "TypeScript", "Node.js", 
              "MongoDB", "PostgreSQL", "Docker", "AWS",
              "Flutter", "Swift", "Kotlin", "Vue.js"
            ].map((tech, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                <span className="text-sm font-medium font-arabic-modern">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Pricing Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-arabic-heading">
              خطط مرنة
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-arabic-modern reading-optimized">
              اختر الخطة التي تناسب احتياجاتك
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "أساسي",
                price: "مجاني",
                features: ["عرض موقع واحد", "دعم أساسي", "تحليلات محدودة"]
              },
              {
                name: "احترافي",
                price: "99 ريال/شهرياً",
                features: ["عرض 10 مواقع", "دعم متميز", "تحليلات كاملة", "SEO متقدم"],
                popular: true
              },
              {
                name: "مؤسسي",
                price: "299 ريال/شهرياً",
                features: ["مواقع غير محدودة", "دعم أولوية", "تحليلات متقدمة", "SEO احترافي", "API مخصص"]
              }
            ].map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-yellow-500' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-yellow-500 text-white px-4 py-1">الأكثر شعبية</Badge>
                  </div>
                )}
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-2 font-arabic-modern">{plan.name}</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-6 font-arabic-modern">{plan.price}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center justify-center font-arabic-modern reading-optimized">
                        <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.popular ? 'bg-yellow-500 text-white' : 'bg-gray-900 text-white'}`}>
                    اختر الخطة
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <PaymentMethods />

      {/* 6. Newsletter Signup */}
      <section className="py-20 bg-yellow-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-arabic-heading">
            انضم إلى نشرتنا البريدية
          </h2>
          <p className="text-xl text-gray-700 mb-8 font-arabic-modern reading-optimized">
            احصل على آخر العروض والأخبار والنصائح مباشرة في بريدك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="بريدك الإلكتروني"
              className="flex-1 text-right"
            />
            <Button className="bg-gray-900 text-white hover:bg-gray-800">
              اشترك الآن
            </Button>
          </div>
        </div>
      </section>

      {/* 7. Recent Blog Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-arabic-heading">
              أحدث المقالات
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-arabic-modern reading-optimized">
              نصائح وأخبار من عالم التكنولوجيا
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "كيف تختار المنصة المناسبة لمتجرك الإلكتروني",
                excerpt: "دليل شامل لاختيار أفضل منصة للتجارة الإلكترونية",
                date: "15 يناير 2024",
                image: "/template-ecommerce.jpg"
              },
              {
                title: "أهمية تحسين محركات البحث للمواقع",
                excerpt: "كيف يمكن لـ SEO تحسين ظهور موقعك في نتائج البحث",
                date: "12 يناير 2024",
                image: "/template-saas.jpg"
              },
              {
                title: "اتجاهات تطوير الويب لعام 2024",
                excerpt: "أحدث التقنيات والاتجاهات في عالم تطوير الويب",
                date: "8 يناير 2024",
                image: "/template-portfolio.jpg"
              }
            ].map((post, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6">
                  <p className="text-sm text-gray-500 mb-2 font-arabic-modern">{post.date}</p>
                  <h3 className="text-xl font-semibold mb-2 font-arabic-modern">{post.title}</h3>
                  <p className="text-gray-600 mb-4 font-arabic-modern reading-optimized">{post.excerpt}</p>
                  <Button variant="outline" className="w-full">
                    اقرأ المزيد
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Partners Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-arabic-heading">
              شركاء النجاح
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-arabic-modern reading-optimized">
              نفتخر بالعمل مع أفضل الشركات
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg p-8 flex items-center justify-center hover:shadow-lg transition-shadow">
                <div className="w-24 h-12 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-arabic-heading">
              الأسئلة الشائعة
            </h2>
            <p className="text-xl text-gray-600 font-arabic-modern reading-optimized">
              إجابات على أكثر الأسئلة شيوعاً
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "كم يستغرق تطوير الموقع؟",
                a: "يعتمد على تعقيد الموقع. المواقع البسيطة تستغرق 2-4 أسابيع، بينما المواقع المعقدة قد تستغرق 2-3 أشهر."
              },
              {
                q: "هل تقدمون دعماً فنياً؟",
                a: "نعم، نقدم دعماً فنياً على مدار الساعة لجميع عملائنا."
              },
              {
                q: "هل يمكن تعديل الموقع بعد التسليم؟",
                a: "بالتأكيد، جميع مواقعنا قابلة للتعديل وسنقدم لك التدريب اللازم."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2 font-arabic-modern">{faq.q}</h3>
                  <p className="text-gray-600 font-arabic-modern reading-optimized">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Stats Counter */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "مشروع مكتمل" },
              { number: "200+", label: "عميل سعيد" },
              { number: "10+", label: "سنوات خبرة" },
              { number: "24/7", label: "دعم فني" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold mb-2 font-arabic-heading">{stat.number}</div>
                <div className="text-lg font-arabic-modern">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-arabic-heading text-shadow-lg">
            انضم إلى سوقنا
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto font-arabic-modern text-shadow reading-optimized">
            اعرض مواقعك وخدماتك على CIAR ووصل إلى آلاف العملاء المحتملين
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/providers">
              <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-arabic-modern font-semibold">
                كن مزود خدمة
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 font-arabic-modern font-semibold">
                عرض الأسعار
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <img src="/logo.png" alt="CIAR" className="w-8 h-8" />
              <h3 className="text-2xl font-bold font-arabic-heading">CIAR</h3>
            </div>
            <p className="text-gray-400 mb-6 font-arabic-modern reading-optimized">
              السوق النهائي للمواقع والخدمات الرقمية
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors font-arabic-modern">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors font-arabic-modern">
                GitHub
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors font-arabic-modern">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors font-arabic-modern">
                Instagram
              </a>
            </div>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400 font-arabic-modern">
                © 2024 سوق CIAR. جميع الحقوق محفوظة.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
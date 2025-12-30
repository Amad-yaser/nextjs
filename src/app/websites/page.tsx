'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Search, Filter, Image as ImageIcon, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { Website } from '@/types'

interface ImageCarouselProps {
  images: string[]
  title: string
}

function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isPlaying, images.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <ImageIcon className="h-12 w-12 text-gray-400" />
      </div>
    )
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
                onClick={() => goToSlide(index)}
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
  )
}

export default function WebsitesPage() {
  const [websites, setWebsites] = useState<Website[]>([])
  const [filteredWebsites, setFilteredWebsites] = useState<Website[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchWebsites()
  }, [])

  useEffect(() => {
    filterWebsites()
  }, [websites, searchTerm, selectedCategory])

  const fetchWebsites = async () => {
    try {
      const response = await fetch('/api/websites')
      if (!response.ok) throw new Error('فشل في جلب المواقع')
      const data = await response.json()
      setWebsites(data)
    } catch (error) {
      console.error('Error fetching websites:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterWebsites = () => {
    let filtered = websites

    if (searchTerm) {
      filtered = filtered.filter(website =>
        website.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        website.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        website.technologies?.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(website => website.category === selectedCategory)
    }

    setFilteredWebsites(filtered)
  }

  const categories = ['all', ...Array.from(new Set(websites.map(w => w.category)))]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            معرض أعمالنا
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            نفتخر بتقديم مجموعة متنوعة من المشاريع الناجحة التي تعكس خبرتنا وجودتنا في تطوير المواقع والحلول الرقمية
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="ابحث عن موقع..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                {categories.slice(1).map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredWebsites.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              لا توجد نتائج
            </h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory !== 'all' 
                ? 'جرب تعديل البحث أو الفلتر' 
                : 'لم تتم إضافة أي مواقع بعد'
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredWebsites.map((website) => (
              <Card key={website.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-0">
                  <ImageCarousel 
                    images={website.images || []} 
                    title={website.title} 
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <CardTitle className="text-xl text-gray-900">
                      {website.title}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {website.category}
                    </Badge>
                  </div>
                  
                  {website.description && (
                    <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                      {website.description}
                    </CardDescription>
                  )}
                  
                  {website.technologies && website.technologies.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {website.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <ImageIcon className="h-4 w-4" />
                      <span>{website.images?.length || 0} صور</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(website.url, '_blank')}
                      className="hover:bg-blue-50 hover:border-blue-300"
                    >
                      <ExternalLink className="h-4 w-4 ml-1" />
                      زيارة الموقع
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            هل أنت مستعد لبدء مشروعك؟
          </h2>
          <p className="text-gray-600 mb-8">
            انضم إلى عملائنا السعداء واطلب مشروعك اليوم
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            اطلب مشروعك الآن
          </Button>
        </div>
      </div>
    </div>
  )
}
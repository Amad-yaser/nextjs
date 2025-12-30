'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Code, Palette, Smartphone, TrendingUp, Globe, Database, Shield, Zap, ExternalLink, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

interface Website {
  id: string
  title: string
  description: string
  url: string
  category: string
  technologies: string[]
  images: string[]
}

export default function ServicesPage() {
  const [websites, setWebsites] = useState<Website[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWebsites()
  }, [])

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

  const services = [
    {
      icon: <Code className="w-12 h-12 text-blue-600" />,
      title: 'تطوير المواقع',
      description: 'تطوير مواقع ويب احترافية باستخدام أحدث التقنيات والأطر البرمجية',
      features: ['تطوير Frontend', 'تطوير Backend', 'APIs', 'تطبيقات Full-Stack'],
      price: 'من 5000 ريال',
      category: 'all'
    },
    {
      icon: <Palette className="w-12 h-12 text-purple-600" />,
      title: 'التصميم الإبداعي',
      description: 'تصاميم عصرية وجذابة تعكس هوية علامتك التجارية',
      features: ['تصميم واجهات', 'التصميم المتجاوب', 'تجربة المستخدم', 'الهوية البصرية'],
      price: 'من 3000 ريال',
      category: 'all'
    },
    {
      icon: <Smartphone className="w-12 h-12 text-green-600" />,
      title: 'تطبيقات الجوال',
      description: 'تطوير تطبيقات جوال أصلية لهواتف iOS و Android',
      features: ['تطبيقات iOS', 'تطبيقات Android', 'تطبيقات هجينة', 'PWA'],
      price: 'من 8000 ريال',
      category: 'all'
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-orange-600" />,
      title: 'التسويق الرقمي',
      description: 'حملات تسويقية فعالة لزيادة ظهورك على الإنترنت',
      features: ['SEO', 'التسويق عبر المحتوى', 'الإعلانات المدفوعة', 'تحليل الأداء'],
      price: 'من 2000 ريال/شهر',
      category: 'all'
    },
    {
      icon: <Globe className="w-12 h-12 text-cyan-600" />,
      title: 'الاستضافة والنطاقات',
      description: 'حلول استضافة موثوقة وسريعة مع دعم فني على مدار الساعة',
      features: ['استضافة مشتركة', 'خوادم خاصة', 'نطاقات', 'شهادات SSL'],
      price: 'من 100 ريال/شهر',
      category: 'all'
    },
    {
      icon: <Database className="w-12 h-12 text-red-600" />,
      title: 'إدارة قواعد البيانات',
      description: 'تصميم وإدارة قواعد بيانات فعالة وآمنة',
      features: ['تصميم قواعد البيانات', 'التحسين', 'النسخ الاحتياطي', 'الأمان'],
      price: 'من 1500 ريال',
      category: 'all'
    },
    {
      icon: <Shield className="w-12 h-12 text-indigo-600" />,
      title: 'الأمان السيبراني',
      description: 'حماية موقعك وبياناتك من التهديدات الرقمية',
      features: ['فحص الثغرات', 'جدار الحماية', 'التشفير', 'المراقبة'],
      price: 'من 2500 ريال',
      category: 'all'
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-600" />,
      title: 'الصيانة والدعم',
      description: 'خدمات صيانة مستمرة ودعم فني لضمان عمل موقعك بكفاءة',
      features: ['تحديثات منتظمة', 'النسخ الاحتياطي', 'دعم 24/7', 'مراقبة الأداء'],
      price: 'من 500 ريال/شهر',
      category: 'all'
    }
  ]

  const getWebsitesForService = (serviceTitle: string) => {
    const serviceCategoryMap: Record<string, string[]> = {
      'تطوير المواقع': [
        'الموضة',
        'الموضة الفاخرة',
        'تجارة بين الشركات',
        'التجارة الإلكترونية',
        'السياحة',
        'العقارات',
        'السيارات',
        'الخدمات المنزلية',
        'الخدمات اللوجستية',
        'التوظيف',
        'التسويق',
        'الاستثمار'
      ],
      'التصميم الإبداعي': ['الموضة', 'الموضة الفاخرة', 'التجارة الإلكترونية', 'التسويق'],
      'تطبيقات الجوال': ['التجارة الإلكترونية', 'السياحة', 'الخدمات اللوجستية', 'النقل الحضري'],
      'التسويق الرقمي': ['التسويق', 'التجارة الإلكترونية', 'الموضة'],
      'الاستضافة والنطاقات': ['التجارة الإلكترونية', 'العقارات', 'الخدمات اللوجستية', 'الاستثمار'],
      'إدارة قواعد البيانات': ['تجارة بين الشركات', 'الخدمات اللوجستية', 'التوظيف', 'الاستثمار'],
      'الأمان السيبراني': ['الاستثمار', 'التسويق', 'الخدمات اللوجستية'],
      'الصيانة والدعم': ['الخدمات المنزلية', 'السيارات', 'الخدمات اللوجستية', 'النقل الحضري']
    }

    const relevantCategories = serviceCategoryMap[serviceTitle] || []
    if (relevantCategories.length === 0) {
      return websites.slice(0, 3)
    }
    return websites.filter(site => relevantCategories.includes(site.category)).slice(0, 3)
  }

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
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            خدماتنا
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نقدم مجموعة شاملة من الخدمات الرقمية لمساعدتك على النجاح في العالم الرقمي
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const relevantWebsites = getWebsitesForService(service.title)
            
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full ml-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {relevantWebsites.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">أمثلة على مشاريعنا:</h4>
                      <div className="space-y-2">
                        {relevantWebsites.map((website) => (
                          <div key={website.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <ImageIcon className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-700 truncate">
                                {website.title}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(website.url, '_blank')}
                              className="hover:bg-blue-50 p-1 h-6"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600 mb-4">
                      {service.price}
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      اطلب الخدمة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 bg-blue-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            هل تحتخدم إلى حل مخصص؟
          </h2>
          <p className="text-xl mb-8">
            نقدم حلولاً مصممة خصيصاً لتلبية احتياجات عملك
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              تواصل معنا
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
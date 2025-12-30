'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Star,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  provider: string;
  description: string;
  features: string[];
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
}

export function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      title: 'تطوير متجر إلكتروني متكامل',
      category: 'development',
      price: 5000,
      rating: 4.9,
      reviewCount: 28,
      provider: 'أحمد محمد',
      description: 'تطوير متجر إلكتروني احترافي مع جميع المميزات',
      features: ['تصميم مخصص', 'نظام دفع', 'إدارة المخزون', 'دعم فني'],
      isFeatured: true,
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'تصميم واجهة مستخدم احترافية',
      category: 'design',
      price: 3000,
      rating: 4.7,
      reviewCount: 15,
      provider: 'فاطمة علي',
      description: 'تصميم واجهة مستخدم جذابة وعصرية',
      features: ['تصميم UI/UX', 'نماذج تفاعلية', 'دليل الأنماط', 'ملفات مصدرية'],
      isFeatured: false,
      isActive: true,
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      title: 'تحسين محركات البحث',
      category: 'marketing',
      price: 2000,
      rating: 4.8,
      reviewCount: 32,
      provider: 'محمد سعيد',
      description: 'تحسين ظهور موقعك في نتائج البحث',
      features: ['بحث عن كلمات مفتاحية', 'تحسين تقني', 'بناء روابط', 'تقارير شهرية'],
      isFeatured: true,
      isActive: true,
      createdAt: '2024-01-05'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && service.isActive) ||
      (filterStatus === 'inactive' && !service.isActive) ||
      (filterStatus === 'featured' && service.isFeatured);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCategoryBadge = (category: string) => {
    const categories = {
      'development': 'تطوير',
      'design': 'تصميم',
      'marketing': 'تسويق',
      'consulting': 'استشارات'
    };
    return (
      <Badge variant="outline">
        {categories[category as keyof typeof categories] || category}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">إدارة الخدمات</h2>
          <p className="text-gray-600">إدارة جميع الخدمات المقدمة</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 ml-2" />
          إضافة خدمة
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الخدمات</p>
                <p className="text-2xl font-bold">{services.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الخدمات النشطة</p>
                <p className="text-2xl font-bold">{services.filter(s => s.isActive).length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوسط السعر</p>
                <p className="text-2xl font-bold">
                  {Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length)} ريال
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوسط التقييم</p>
                <p className="text-2xl font-bold">
                  {(services.reduce((sum, s) => sum + s.rating, 0) / services.length).toFixed(1)}
                </p>
              </div>
              <Star className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">البحث والتصفية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="البحث عن خدمة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="all">جميع الفئات</option>
              <option value="development">تطوير</option>
              <option value="design">تصميم</option>
              <option value="marketing">تسويق</option>
              <option value="consulting">استشارات</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
              <option value="featured">مميز</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Services List */}
      <div className="space-y-4">
        {filteredServices.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Service Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-3">{service.description}</p>
                      <div className="flex items-center gap-4 mb-3">
                        {getCategoryBadge(service.category)}
                        {service.isFeatured && (
                          <Badge className="bg-yellow-500">
                            <Star className="w-3 h-3 ml-1" />
                            مميز
                          </Badge>
                        )}
                        <Badge className={service.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {service.isActive ? 'نشط' : 'غير نشط'}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-blue-600">{service.price} ريال</div>
                      <div className="flex items-center space-x-1 space-x-reverse mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{service.rating}</span>
                        <span className="text-sm text-gray-500">({service.reviewCount} تقييم)</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">المميزات:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Provider and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <span>مقدم الخدمة: </span>
                      <span className="font-medium">{service.provider}</span>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 ml-1" />
                        معاينة
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
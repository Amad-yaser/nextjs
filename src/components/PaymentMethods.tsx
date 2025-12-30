'use client';

import { CreditCard, Smartphone, Wallet, QrCode, Building2, Landmark, Shield, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

const paymentMethods = [
  {
    name: 'فيزا',
    englishName: 'Visa',
    icon: (
      <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
        <span className="text-white font-bold text-sm">VISA</span>
      </div>
    ),
    description: 'بطاقة ائتمان خصم مباشر',
    color: 'from-blue-50 to-blue-100',
    borderColor: 'border-blue-200'
  },
  {
    name: 'ماستر كارد',
    englishName: 'Mastercard',
    icon: (
      <div className="w-12 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded flex items-center justify-center">
        <div className="w-8 h-6 bg-white/90 rounded-sm flex items-center justify-center">
          <div className="w-6 h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-sm"></div>
        </div>
      </div>
    ),
    description: 'بطاقة ائتمان عالمية',
    color: 'from-red-50 to-orange-50',
    borderColor: 'border-red-200'
  },
  {
    name: 'مدى',
    englishName: 'Mada',
    icon: (
      <div className="w-12 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded flex items-center justify-center">
        <span className="text-white font-bold text-xs">مدى</span>
      </div>
    ),
    description: 'نظام الدفع السعودي',
    color: 'from-blue-50 to-indigo-50',
    borderColor: 'border-blue-200'
  },
  {
    name: 'آبل باي',
    englishName: 'Apple Pay',
    icon: (
      <div className="w-12 h-8 bg-black rounded flex items-center justify-center">
        <span className="text-white font-bold text-xs"> Pay</span>
      </div>
    ),
    description: 'دفع عبر الأجهزة الذكية',
    color: 'from-gray-50 to-gray-100',
    borderColor: 'border-gray-300'
  },
  {
    name: 'ستك باي',
    englishName: 'STC Pay',
    icon: (
      <div className="w-12 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded flex items-center justify-center">
        <span className="text-white font-bold text-xs">STC</span>
      </div>
    ),
    description: 'محفظة إلكترونية سعودية',
    color: 'from-purple-50 to-indigo-50',
    borderColor: 'border-purple-200'
  },
  {
    name: 'تحويل بنكي',
    englishName: 'Bank Transfer',
    icon: (
      <div className="w-12 h-8 bg-gradient-to-r from-green-500 to-green-700 rounded flex items-center justify-center">
        <Building2 className="w-6 h-6 text-white" />
      </div>
    ),
    description: 'تحويل مباشر للحساب البنكي',
    color: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-200'
  }
];

export function PaymentMethods() {
  const { t, dir } = useLanguage();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <CreditCard className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-arabic-heading">
            طرق الدفع المتاحة
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-arabic-modern">
            نقدم مجموعة متنوعة من طرق الدفع الآمنة والسهيلة لتلبية جميع احتياجاتكم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentMethods.map((method, index) => (
            <Card 
              key={index} 
              className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 ${method.borderColor} bg-gradient-to-br ${method.color}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    {method.icon}
                    <div>
                      <h3 className="font-bold text-gray-900 font-arabic-modern">
                        {method.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-arabic-modern">
                        {method.englishName}
                      </p>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm font-arabic-modern mb-4">
                  {method.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-700 font-arabic-modern">آمن وموثوق</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Smartphone className="w-4 h-4 text-blue-600" />
                    <span className="text-xs text-blue-700 font-arabic-modern">سريع</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-white px-6 py-3 rounded-full shadow-md border border-gray-200">
            <Landmark className="w-5 h-5 text-green-600" />
            <span className="text-gray-700 font-arabic-modern">
              جميع المعاملات مشفرة وآمنة 100%
            </span>
            <Shield className="w-5 h-5 text-green-600" />
          </div>
        </div>
      </div>
    </section>
  );
}
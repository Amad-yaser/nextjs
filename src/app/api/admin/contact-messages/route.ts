import { NextRequest, NextResponse } from 'next/server';

// Mock data - in a real app, this would come from a database
const mockContactMessages = [
  {
    id: '1',
    name: 'سالم أحمد',
    email: 'salem@example.com',
    subject: 'استفسار عن تطوير موقع تجارة إلكترونية',
    message: 'أرغب في تطوير موقع تجارة إلكترونية لمنتجاتي، هل يمكنكم تزويدي بتفاصيل الخدمات والأسعار؟',
    status: 'unread' as const,
    createdAt: '2024-01-20 10:30',
    priority: 'high' as const
  },
  {
    id: '2',
    name: 'نورة محمد',
    email: 'noura@example.com',
    subject: 'طلب تصميم هوية بصرية',
    message: 'أحتاج إلى تصميم هوية بصرية كاملة لشركتي الناشئة، بما في ذلك الشعار والألوان والخطوط.',
    status: 'read' as const,
    createdAt: '2024-01-19 14:15',
    priority: 'medium' as const
  },
  {
    id: '3',
    name: 'خالد العتيبي',
    email: 'khalid@example.com',
    subject: 'مشكلة في الموقع',
    message: 'واجهت مشكلة في تحميل الصفحة الرئيسية، تظهر رسالة خطأ عند محاولة الدخول.',
    status: 'replied' as const,
    createdAt: '2024-01-18 09:45',
    priority: 'high' as const
  },
  {
    id: '4',
    name: 'مريم سعيد',
    email: 'mariam@example.com',
    subject: 'اقتراح للتحسين',
    message: 'لدي اقتراح لإضافة ميزة البحث المتقدم في الموقع،这将帮助 المستخدمين في العثور على ما يبحثون عنه بسهولة.',
    status: 'read' as const,
    createdAt: '2024-01-17 16:20',
    priority: 'low' as const
  }
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(mockContactMessages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newMessage = {
      id: Date.now().toString(),
      ...body,
      status: 'unread' as const,
      createdAt: new Date().toLocaleString('ar-SA')
    };
    
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('Error creating contact message:', error);
    return NextResponse.json(
      { error: 'Failed to create contact message' },
      { status: 500 }
    );
  }
}
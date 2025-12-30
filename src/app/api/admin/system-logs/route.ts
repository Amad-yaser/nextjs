import { NextRequest, NextResponse } from 'next/server';

// Mock data - in a real app, this would come from a database
const mockSystemLogs = [
  {
    id: '1',
    action: 'تسجيل دخول المدير',
    user: 'admin@ciarcir.com',
    ip: '192.168.1.100',
    timestamp: '2024-01-20 14:30:00',
    status: 'success' as const,
    details: 'تم تسجيل الدخول بنجاح من لوحة التحكم'
  },
  {
    id: '2',
    action: 'إنشاء مستخدم جديد',
    user: 'admin@ciarcir.com',
    ip: '192.168.1.100',
    timestamp: '2024-01-20 13:45:00',
    status: 'success' as const,
    details: 'تم إنشاء المستخدم: أحمد محمد'
  },
  {
    id: '3',
    action: 'محاولة تسجيل دخول فاشلة',
    user: 'unknown@example.com',
    ip: '192.168.1.200',
    timestamp: '2024-01-20 12:30:00',
    status: 'error' as const,
    details: 'كلمة المرور غير صحيحة'
  },
  {
    id: '4',
    action: 'تحديث إعدادات النظام',
    user: 'admin@ciarcir.com',
    ip: '192.168.1.100',
    timestamp: '2024-01-20 11:15:00',
    status: 'success' as const,
    details: 'تم تحديث إعدادات النظام بنجاح'
  },
  {
    id: '5',
    action: 'إنشاء نسخة احتياطية',
    user: 'system',
    ip: 'localhost',
    timestamp: '2024-01-20 10:00:00',
    status: 'success' as const,
    details: 'تم إنشاء نسخة احتياطية تلقائية'
  },
  {
    id: '6',
    action: 'حذف مستخدم',
    user: 'admin@ciarcir.com',
    ip: '192.168.1.100',
    timestamp: '2024-01-20 09:30:00',
    status: 'warning' as const,
    details: 'تم حذف المستخدم: test@example.com'
  }
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(mockSystemLogs);
  } catch (error) {
    console.error('Error fetching system logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch system logs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newLog = {
      id: Date.now().toString(),
      ...body,
      timestamp: new Date().toLocaleString('ar-SA')
    };
    
    return NextResponse.json(newLog, { status: 201 });
  } catch (error) {
    console.error('Error creating system log:', error);
    return NextResponse.json(
      { error: 'Failed to create system log' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';

// Mock data - in a real app, this would come from a database
const mockBackgroundImages = [
  {
    id: '1',
    url: '/header-bg-1.jpg',
    title: 'تصميم أعمال حديث وأنيق',
    active: true,
    order: 1,
    createdAt: '2024-01-20'
  },
  {
    id: '2',
    url: '/header-bg-2.jpg',
    title: 'هيئة شركة فاخرة بالذهبي والأزرق',
    active: true,
    order: 2,
    createdAt: '2024-01-19'
  },
  {
    id: '3',
    url: '/header-bg-3.jpg',
    title: 'شركة تكنولوجيا احترافية',
    active: true,
    order: 3,
    createdAt: '2024-01-18'
  },
  {
    id: '4',
    url: '/header-bg-4.jpg',
    title: 'تصميم بسيط وأنيق بالأخضر',
    active: true,
    order: 4,
    createdAt: '2024-01-17'
  },
  {
    id: '5',
    url: '/header-bg-5.jpg',
    title: 'أفق دبي الحديث عند الغروب',
    active: true,
    order: 5,
    createdAt: '2024-01-16'
  },
  {
    id: '6',
    url: '/header-bg-6.jpg',
    title: 'نيويورك مانهاتن المالية',
    active: true,
    order: 6,
    createdAt: '2024-01-15'
  },
  {
    id: '7',
    url: '/header-bg-7.jpg',
    title: 'اجتماع رواد الأعمال الحديث',
    active: true,
    order: 7,
    createdAt: '2024-01-14'
  },
  {
    id: '8',
    url: '/header-bg-8.jpg',
    title: 'طوكيو الحيوية ليلاً',
    active: true,
    order: 8,
    createdAt: '2024-01-13'
  },
  {
    id: '9',
    url: '/header-bg-9.jpg',
    title: 'لندن المالية الأنيقة',
    active: true,
    order: 9,
    createdAt: '2024-01-12'
  },
  {
    id: '10',
    url: '/header-bg-10.jpg',
    title: 'مركز الأعمال الناشئ',
    active: true,
    order: 10,
    createdAt: '2024-01-11'
  },
  {
    id: '11',
    url: '/header-bg-11.jpg',
    title: 'سنغافورة العصرية',
    active: true,
    order: 11,
    createdAt: '2024-01-10'
  },
  {
    id: '12',
    url: '/header-bg-12.jpg',
    title: 'الرياض مركز المملكة',
    active: true,
    order: 12,
    createdAt: '2024-01-09'
  },
  {
    id: '13',
    url: '/header-bg-13.jpg',
    title: 'نجاح ريادة الأعمال',
    active: true,
    order: 13,
    createdAt: '2024-01-08'
  },
  {
    id: '14',
    url: '/header-bg-14.jpg',
    title: 'مساحة عمل مشتركة مبتكرة',
    active: true,
    order: 14,
    createdAt: '2024-01-07'
  }
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(mockBackgroundImages);
  } catch (error) {
    console.error('Error fetching background images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch background images' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newImage = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    console.error('Error uploading background image:', error);
    return NextResponse.json(
      { error: 'Failed to upload background image' },
      { status: 500 }
    );
  }
}
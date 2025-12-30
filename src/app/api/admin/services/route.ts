import { NextRequest, NextResponse } from 'next/server';

// Mock data - in a real app, this would come from a database
const mockServices = [
  {
    id: '1',
    title: 'تطوير المواقع',
    description: 'تطوير مواقع ويب احترافية باستخدام أحدث التقنيات',
    icon: 'Code',
    active: true,
    order: 1
  },
  {
    id: '2',
    title: 'التصميم الجرافيكي',
    description: 'تصميم هويات بصرية وشعارات احترافية',
    icon: 'Palette',
    active: true,
    order: 2
  },
  {
    id: '3',
    title: 'تطبيقات الجوال',
    description: 'تطوير تطبيقات جوال أصلية لهواتف iOS و Android',
    icon: 'Smartphone',
    active: true,
    order: 3
  },
  {
    id: '4',
    title: 'التسويق الرقمي',
    description: 'حملات تسويقية شاملة لزيادة وجودك الرقمي',
    icon: 'TrendingUp',
    active: false,
    order: 4
  }
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(mockServices);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newService = {
      id: Date.now().toString(),
      ...body,
      order: mockServices.length + 1
    };
    
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}
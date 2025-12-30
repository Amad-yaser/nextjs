import { NextRequest, NextResponse } from 'next/server';

// Mock data - in a real app, this would come from a database
const mockNews = [
  {
    id: '1',
    text: '🎉 خصم 20% على جميع قوالب المواقع هذا الأسبوع',
    icon: '🎉',
    active: true,
    createdAt: '2024-01-20',
    priority: 'high' as const
  },
  {
    id: '2',
    text: '🚀 إطلاق ميزات جديدة في لوحة التحكم',
    icon: '🚀',
    active: true,
    createdAt: '2024-01-19',
    priority: 'medium' as const
  },
  {
    id: '3',
    text: '📢 صيانة مجدولة يوم الجمعة من 2 صباحاً إلى 4 صباحاً',
    icon: '📢',
    active: false,
    createdAt: '2024-01-18',
    priority: 'low' as const
  },
  {
    id: '4',
    text: '💡 نصائح جديدة لتحسين أداء موقعك',
    icon: '💡',
    active: true,
    createdAt: '2024-01-17',
    priority: 'medium' as const
  }
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(mockNews);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newNews = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    return NextResponse.json(newNews, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json(
      { error: 'Failed to create news' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { AdminWebsite, addWebsite, listWebsites } from '@/data/websites'

export async function GET() {
  try {
    return NextResponse.json(listWebsites())
  } catch (error) {
    console.error('Error fetching websites:', error)
    return NextResponse.json(
      { error: 'فشل في جلب المواقع' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.title || !body.url || !body.category) {
      return NextResponse.json(
        { error: 'جميع الحقول المطلوبة يجب ملؤها' },
        { status: 400 }
      )
    }

    const newWebsite: AdminWebsite = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description || '',
      url: body.url,
      category: body.category,
      technologies: body.technologies || [],
      images: body.images || [],
      badges: body.badges || [],
      tags: body.tags || [],
      hidden: body.hidden ?? false,
      displayOrder: body.displayOrder || listWebsites({ includeHidden: true }).length + 1
    }

    addWebsite(newWebsite)

    return NextResponse.json(newWebsite, { status: 201 })
  } catch (error) {
    console.error('Error creating website:', error)
    return NextResponse.json(
      { error: 'فشل في إنشاء الموقع' },
      { status: 500 }
    )
  }
}
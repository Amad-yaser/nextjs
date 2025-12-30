import { NextRequest, NextResponse } from 'next/server'
import { AdminWebsite, addWebsite, listWebsites, removeWebsite, updateWebsite } from '@/data/websites'

export async function GET() {
  return NextResponse.json(listWebsites({ includeHidden: true }))
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.title || !data.url || !data.category) {
      return NextResponse.json({ error: 'title, url and category are required' }, { status: 400 })
    }

    const payload: AdminWebsite = {
      id: data.id || Date.now().toString(),
      title: data.title,
      description: data.description || '',
      category: data.category,
      url: data.url,
      technologies: data.technologies || [],
      images: data.images || ['/template-portfolio.jpg'],
      badges: data.badges || [],
      featured: data.featured ?? false,
      tags: data.tags || [],
      status: data.status || 'active',
      client: data.client || 'CIAR',
      hidden: data.hidden ?? false,
      displayOrder: data.displayOrder || listWebsites({ includeHidden: true }).length + 1
    }

    addWebsite(payload)
    return NextResponse.json(payload, { status: 201 })
  } catch (error) {
    console.error('Failed to create website', error)
    return NextResponse.json({ error: 'Failed to create website' }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const { id, ...updateData } = data

    if (!id) {
      return NextResponse.json({ error: 'Website id is required' }, { status: 400 })
    }

    const updated = updateWebsite(id, updateData)

    if (!updated) {
      return NextResponse.json({ error: 'Website not found' }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Failed to update website', error)
    return NextResponse.json({ error: 'Failed to update website' }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Website id is required' }, { status: 400 })
    }

    const removed = removeWebsite(id)

    if (!removed) {
      return NextResponse.json({ error: 'Website not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete website', error)
    return NextResponse.json({ error: 'Failed to delete website' }, { status: 400 })
  }
}
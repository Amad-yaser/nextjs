import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const price = formData.get('price') as string;
    const provider = formData.get('provider') as string;
    const features = JSON.parse(formData.get('features') as string || '[]');
    const technologies = JSON.parse(formData.get('technologies') as string || '[]');
    const demoUrl = formData.get('demoUrl') as string;
    
    // Validate required fields
    if (!title || !description || !category || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'websites');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Handle image uploads
    const images: string[] = [];
    let imageIndex = 0;
    
    while (true) {
      const image = formData.get(`image${imageIndex}`) as File;
      if (!image) break;
      
      try {
        // Generate unique filename
        const timestamp = Date.now();
        const filename = `${title.replace(/\s+/g, '_')}_${timestamp}_${imageIndex}.${image.name.split('.').pop()}`;
        const filepath = join(uploadsDir, filename);
        
        // Save file
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filepath, buffer);
        
        // Store public URL
        images.push(`/uploads/websites/${filename}`);
        imageIndex++;
      } catch (error) {
        console.error('Error saving image:', error);
      }
    }

    // Create new website object
    const newWebsite = {
      id: Date.now().toString(),
      title,
      description,
      category,
      price: parseFloat(price),
      provider: provider || 'CIAR',
      features,
      technologies,
      demoUrl,
      images: images.length > 0 ? images : ['/template-portfolio.jpg'], // Fallback image
      rating: 0,
      reviews: 0,
      status: 'active' as const,
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    // In a real application, you would save this to a database
    // For now, we'll just return the created website
    console.log('New website created:', newWebsite);

    return NextResponse.json({
      success: true,
      website: newWebsite,
      message: 'Website added successfully'
    });

  } catch (error) {
    console.error('Error adding website:', error);
    return NextResponse.json(
      { error: 'Failed to add website' },
      { status: 500 }
    );
  }
}
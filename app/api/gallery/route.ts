import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import imagekit from '@/lib/imagekit';
import { z } from 'zod';

const gallerySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  link: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

/**
 * Download an image from a URL and upload it to ImageKit.
 * Returns the permanent ImageKit URL.
 */
async function uploadImageFromUrl(sourceUrl: string, title: string): Promise<string> {
  // Download the image
  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`Failed to download image from URL: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Extract a reasonable filename from the URL or title
  const urlPath = new URL(sourceUrl).pathname;
  const extension = urlPath.split('.').pop()?.split('?')[0] || 'jpg';
  const sanitizedTitle = title.replace(/[^a-zA-Z0-9-_]/g, '_').slice(0, 50);
  const fileName = `gallery_${sanitizedTitle}_${Date.now()}.${extension}`;

  // Upload to ImageKit
  const uploadResponse = await imagekit.files.upload({
    file: buffer.toString('base64'),
    fileName,
    folder: '/gallery',
  });

  return uploadResponse.url as string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const where = category && category !== 'All Categories' ? { category } : {};

    const items = await prisma.galleryItem.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const IMAGEKIT_URL_PREFIX = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io';

  try {
    const json = await request.json();
    const body = gallerySchema.parse(json);

    // Download from the provided URL and upload to ImageKit, unless it's already an ImageKit URL
    let imagekitUrl = body.imageUrl;
    if (!body.imageUrl.startsWith(IMAGEKIT_URL_PREFIX)) {
      imagekitUrl = await uploadImageFromUrl(body.imageUrl, body.title);
    }

    const item = await prisma.galleryItem.create({
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        imageUrl: imagekitUrl,
        link: body.link || null,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Error creating gallery item:', error);
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 });
  }
}

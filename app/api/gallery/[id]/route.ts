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

const IMAGEKIT_URL_PREFIX = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io';

/**
 * Download an image from a URL and upload it to ImageKit.
 * Returns the permanent ImageKit URL.
 */
async function uploadImageFromUrl(sourceUrl: string, title: string): Promise<string> {
  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`Failed to download image from URL: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const urlPath = new URL(sourceUrl).pathname;
  const extension = urlPath.split('.').pop()?.split('?')[0] || 'jpg';
  const sanitizedTitle = title.replace(/[^a-zA-Z0-9-_]/g, '_').slice(0, 50);
  const fileName = `gallery_${sanitizedTitle}_${Date.now()}.${extension}`;

  const uploadResponse = await imagekit.files.upload({
    file: buffer.toString('base64'),
    fileName,
    folder: '/gallery',
  });

  return uploadResponse.url as string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const item = await prisma.galleryItem.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!item) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery item' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const json = await request.json();
    const body = gallerySchema.parse(json);

    // Only re-upload if the URL is not already an ImageKit URL
    let finalImageUrl = body.imageUrl;
    if (!body.imageUrl.startsWith(IMAGEKIT_URL_PREFIX)) {
      finalImageUrl = await uploadImageFromUrl(body.imageUrl, body.title);
    }

    const item = await prisma.galleryItem.update({
      where: { id: resolvedParams.id },
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        imageUrl: finalImageUrl,
        link: body.link || null,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Error updating gallery item:', error);
    return NextResponse.json({ error: 'Failed to update gallery item' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    await prisma.galleryItem.delete({
      where: { id: resolvedParams.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
  }
}

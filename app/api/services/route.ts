import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = serviceSchema.parse(json);

    const service = await prisma.service.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to create service' }, { status: 400 });
    }
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

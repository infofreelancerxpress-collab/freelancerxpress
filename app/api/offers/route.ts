import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const offerSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  discountPercentage: z.number().min(0).max(100),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  isActive: z.boolean().default(true),
  serviceIds: z.array(z.string()).min(1, 'At least one service MUST be selected'),
});

export async function GET() {
  try {
    const offers = await prisma.offer.findMany({
      include: {
        services: {
          include: {
            service: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(offers);
  } catch (error) {
    console.error('Error fetching offers:', error);
    return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = offerSchema.parse(json);

    const offer = await prisma.offer.create({
      data: {
        title: body.title,
        description: body.description,
        discountPercentage: body.discountPercentage,
        startDate: body.startDate,
        endDate: body.endDate,
        isActive: body.isActive,
        services: {
          create: body.serviceIds.map((serviceId) => ({
            service: {
              connect: { id: serviceId },
            },
          })),
        },
      },
      include: {
        services: {
          include: {
            service: true,
          },
        },
      },
    });

    return NextResponse.json(offer, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to create offer' }, { status: 400 });
    }
    console.error('Error creating offer:', error);
    return NextResponse.json({ error: 'Failed to create offer' }, { status: 500 });
  }
}

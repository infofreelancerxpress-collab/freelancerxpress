import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const now = new Date();

    const activeOffer = await prisma.offer.findFirst({
      where: {
        isActive: true,
        startDate: {
          lte: now,
        },
        endDate: {
          gte: now,
        },
      },
      include: {
        services: {
          include: {
            service: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Get the most recently created active offer if multiple overlap
      },
    });

    if (!activeOffer) {
      return NextResponse.json(null);
    }

    return NextResponse.json(activeOffer);
  } catch (error) {
    console.error('Error fetching active offer:', error);
    return NextResponse.json({ error: 'Failed to fetch active offer' }, { status: 500 });
  }
}

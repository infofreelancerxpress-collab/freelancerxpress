import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const offerUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  discountPercentage: z.number().min(0).max(100).optional(),
  startDate: z.string().transform((str) => new Date(str)).optional(),
  endDate: z.string().transform((str) => new Date(str)).optional(),
  isActive: z.boolean().optional(),
  serviceIds: z.array(z.string()).min(1, 'At least one service MUST be selected').optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const json = await request.json();
    const body = offerUpdateSchema.parse(json);
    const resolvedParams = await params;

    // If serviceIds are provided, we need to handle the many-to-many relationship
    if (body.serviceIds) {
      // First, delete existing relations
      await prisma.offerService.deleteMany({
        where: { offerId: resolvedParams.id },
      });

      // Then update the offer and create new relations
      const { serviceIds, ...offerData } = body;
      const offer = await prisma.offer.update({
        where: { id: resolvedParams.id },
        data: {
          ...offerData,
          services: {
            create: serviceIds.map((serviceId) => ({
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

      return NextResponse.json(offer);
    } else {
      // No serviceIds, just update primitive fields
      const offer = await prisma.offer.update({
        where: { id: resolvedParams.id },
        data: body,
        include: {
          services: {
            include: {
              service: true,
            },
          },
        },
      });

      return NextResponse.json(offer);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Error updating offer:', error);
    return NextResponse.json({ error: 'Failed to update offer' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    await prisma.offer.delete({
      where: { id: resolvedParams.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting offer:', error);
    return NextResponse.json({ error: 'Failed to delete offer' }, { status: 500 });
  }
}

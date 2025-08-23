import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

// GET: Material by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session || !['SUPER_ADMIN', 'PURCHASING', 'WAREHOUSE'].includes(session.user.role)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const material = await prisma.material.findUnique({
      where: { id: params.id },
      include: { suppliers: true },
    });
    if (!material) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }
    return NextResponse.json(material);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch material' }, { status: 500 });
  }
}

// PUT: Update material
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session || !['SUPER_ADMIN', 'PURCHASING', 'WAREHOUSE'].includes(session.user.role)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const material = await prisma.material.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(material);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update material' }, { status: 500 });
  }
}

// DELETE: Remove material
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session || !['SUPER_ADMIN', 'PURCHASING', 'WAREHOUSE'].includes(session.user.role)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.material.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Material deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete material' }, { status: 500 });
  }
}

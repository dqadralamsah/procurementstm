import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET: Supplier by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session || !['SUPER_ADMIN', 'PURCHASING', 'WAREHOUSE'].includes(session.user.role)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const supplier = await prisma.supplier.findUnique({
      where: { id },
      include: { materials: true, suppliersPO: true },
    });
    if (!supplier) {
      return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }
    return NextResponse.json(supplier);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch supplier' }, { status: 500 });
  }
}

// PUT: Update supplier
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session || !['SUPER_ADMIN', 'PURCHASING'].includes(session.user.role)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const supplier = await prisma.supplier.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(supplier);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update supplier' }, { status: 500 });
  }
}

// DELETE: Remove supplier
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session || !['SUPER_ADMIN', 'PURCHASING'].includes(session.user.role)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.supplier.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Supplier deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete supplier' }, { status: 500 });
  }
}

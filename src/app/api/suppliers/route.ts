import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { generateNextId } from '@/lib/idgenerator';

// GET: List all suppliers
export async function GET() {
  const session = await auth();

  if (!session || !['SUPER_ADMIN', 'PURCHASING', 'WAREHOUSE'].includes(session.user.role)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const suppliers = await prisma.supplier.findMany({
      orderBy: { createdAt: 'desc' },
      include: { materials: true },
    });
    return NextResponse.json(suppliers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch suppliers' }, { status: 500 });
  }
}

// POST: Create new supplier
export async function POST(req: Request) {
  const session = await auth();

  if (!session || !['SUPER_ADMIN', 'PURCHASING'].includes(session.user.role)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const supplierId = await generateNextId('SPPLR', 'supplier', 'id');

  try {
    const body = await req.json();
    const supplier = await prisma.supplier.create({
      data: {
        id: supplierId,
        name: body.name,
        contact: body.contact,
        email: body.email,
        address: body.address,
      },
    });
    return NextResponse.json(supplier, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create supplier' }, { status: 500 });
  }
}

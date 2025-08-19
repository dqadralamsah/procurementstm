import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { generateNextId } from '@/lib/idgenerator';

// GET: List all materials
export async function GET() {
  const session = await auth();

  if (!session || !['SUPER_ADMIN', 'PURCHASING', 'WAREHOUSE'].includes(session.user.role)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const materials = await prisma.material.findMany({
      include: { suppliers: true }, // join ke MaterialSupplier
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(materials);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch materials' }, { status: 500 });
  }
}

// POST: Create material
export async function POST(req: Request) {
  const session = await auth();

  if (!session || !['SUPER_ADMIN', 'PURCHASING', 'WAREHOUSE'].includes(session.user.role)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const materialId = await generateNextId('MTRL', 'material', 'id');

  try {
    const body = await req.json();
    const material = await prisma.material.create({
      data: {
        id: materialId,
        name: body.name,
        category: body.category,
        description: body.description,
        price: body.price,
        unit: body.unit,
        stock: body.stock ?? 0,
        minStock: body.minStock ?? 0,
        maxStock: body.maxStock,
        safetyStock: body.safetyStock,
      },
    });
    return NextResponse.json(material, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create material' }, { status: 500 });
  }
}

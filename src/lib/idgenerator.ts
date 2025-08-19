import prisma from './prisma';

// helper: ambil lastId dari table sesuai prefix
async function getLastId(prefix: string, table: keyof typeof prisma, field: string) {
  const last = await (prisma[table] as any).findFirst({
    where: { [field]: { startsWith: prefix } },
    orderBy: { [field]: 'desc' },
    select: { [field]: true },
  });
  return last ? last[field] : null;
}

// build string id
function buildId(prefix: string, number: number, length: number): string {
  return `${prefix}${String(number).padStart(length, '0')}`;
}

/**
 * Generate single next ID (misal "PRCHS0004")
 */
export async function generateNextId(
  prefix: string,
  table: keyof typeof prisma,
  field: string,
  length: number = 4
): Promise<string> {
  const lastId = await getLastId(prefix, table, field);
  const lastNumber = lastId ? parseInt(lastId.replace(prefix, '')) : 0;
  return buildId(prefix, lastNumber + 1, length);
}

/**
 * Generate multiple next IDs (misal ["PRCHSITM0001", "PRCHSITM0002"])
 */
export async function generateNextIds(
  prefix: string,
  table: keyof typeof prisma,
  field: string,
  count: number,
  length: number = 4
): Promise<string[]> {
  const lastId = await getLastId(prefix, table, field);
  const lastNumber = lastId ? parseInt(lastId.replace(prefix, '')) : 0;

  return Array.from({ length: count }, (_, i) => buildId(prefix, lastNumber + i + 1, length));
}

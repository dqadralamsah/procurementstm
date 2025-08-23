'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Supplier } from '@/types/supplier';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SupplierDetail from '../components/SupplierDetail';

export default function SupplierDetailPage() {
  const { id } = useParams();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchSupplier = async () => {
      try {
        const res = await fetch(`/api/supplier/${id}`);
        if (!res.ok) throw new Error('Failed to fetch supplier');
        const data: Supplier = await res.json();
        setSupplier(data);
      } catch (error) {
        console.error('Filed to fetch supplier:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [id]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant={'outline'}>
          <Link href={`/dashboard/superadmin/supplier`}>Kembali</Link>
        </Button>
      </div>

      {/* Detail Supplier */}
      {!loading && !supplier ? (
        <Card className="bg-red-100 border-red-300">
          <CardContent className="flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold text-red-700 mb-1">Supplier tidak ditemukan</h2>
          </CardContent>
        </Card>
      ) : !loading && supplier ? (
        <SupplierDetail supplier={supplier} />
      ) : null}
    </div>
  );
}

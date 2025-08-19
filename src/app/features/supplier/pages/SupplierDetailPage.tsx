'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Supplier } from '@/types/supplier';
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
        <p className="text-red-600">Supplier tidak ditemukan.</p>
      ) : !loading && supplier ? (
        <SupplierDetail supplier={supplier} />
      ) : null}
    </div>
  );
}

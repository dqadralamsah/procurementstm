'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Supplier } from '@/types/supplier';
import SupplierForm from '../components/SupplierForm';

export default function SupplierEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const [supplier, setSupplier] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const res = await fetch(`/api/supplier/${id}`);
        if (!res.ok) throw new Error('Failed to fetch supplier');
        const data: Supplier = await res.json();
        setSupplier(data);
      } catch (error) {
        console.error('Failed to fetch suppliers:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchSupplier();
  }, [id]);

  const handleUpdate = async (data: any) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/supplier/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('/dashboard/superadmin/supplier');
      } else {
        alert('Gagal memperbarui supplier');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {supplier && (
        <SupplierForm initialData={supplier} onSubmit={handleUpdate} loading={loading} />
      )}
    </div>
  );
}

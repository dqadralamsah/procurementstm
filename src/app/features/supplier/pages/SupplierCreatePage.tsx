'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SupplierForm from '../components/SupplierForm';

export default function SupplierCreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAdd = async (data: any) => {
    setLoading(true);
    const res = await fetch('/api/suppliers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (res.ok) {
      router.push('/dashboard/superadmin/suppliers');
    } else {
      alert('Gagal menambahkan supplier');
    }
  };

  return (
    <div>
      <SupplierForm onSubmit={handleAdd} loading={loading} />
    </div>
  );
}

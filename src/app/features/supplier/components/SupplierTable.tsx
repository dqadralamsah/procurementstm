'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Supplier } from '@/types/supplier';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { MoreVertical } from 'lucide-react';

type Props = {
  role: string;
};

export default function SupplierTable({ role }: Props) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchsupplier = async () => {
      try {
        const res = await fetch(`/api/supplier`);
        if (!res.ok) throw new Error('Failed to fetch suppliers');
        const data = await res.json();
        setSuppliers(data);
      } catch (error) {
        console.error('Failed to fetch suppliers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchsupplier();
  }, []);

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure to delete this supplier?')) return;
    try {
      const res = await fetch(`/api/supplier/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setSuppliers((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="rounded-lg border overflow-auto">
      <table className="w-full text-sm">
        <thead className="bg-purple-100">
          <tr>
            <th className="p-3 text-left">Supplier ID</th>
            <th className="p-3 text-left">Nama</th>
            <th className="p-3 text-center">Contact</th>
            <th className="p-3 text-left">E-mail</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <tr key={i} className="border-t">
                {Array.from({ length: 5 }).map((__, j) => (
                  <td key={j} className="px-4 py-2">
                    <Skeleton className="w-full h-4" />
                  </td>
                ))}
              </tr>
            ))
          ) : suppliers.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-3 border-t text-center">
                Tidak ada Data Supplier.
              </td>
            </tr>
          ) : (
            suppliers.map((s) => (
              <tr key={s.id} className="border-t border-muted hover:bg-muted/60 even:bg-muted/40">
                <td className="p-3 font-mono text-muted-foreground text-left">{s.id}</td>
                <td className="p-3 text-left">{s.name}</td>
                <td className="p-3 text-center">{s.contact}</td>
                <td className="p-3 text-left">{s.email}</td>
                <td className="p-3 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded hover:bg-purple-100 ">
                        <MoreVertical size={16} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/${role}/supplier/${s.id}`}>Detail</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/${role}/supplier/${s.id}/edit`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(s.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

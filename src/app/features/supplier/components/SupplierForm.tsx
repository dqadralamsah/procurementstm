'use client';

import { useState, FormEvent } from 'react';
import { SupplierFormInitial, SupplierFormInput, MaterialInput } from '@/types/supplier';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import MaterialCombobox from '@/components/combobox/MaterialCombobox';

type Props = {
  initialData?: SupplierFormInitial;
  onSubmit: (data: SupplierFormInput) => Promise<void>;
  loading?: boolean;
};

export default function SupplierForm({ initialData, onSubmit, loading }: Props) {
  const [form, setForm] = useState({
    name: initialData?.name || '',
    contact: initialData?.contact || '',
    email: initialData?.email || '',
    address: initialData?.address || '',
  });

  const [materials, setMaterials] = useState<MaterialInput[]>(initialData?.materials || []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit({ ...form, materials });
  };

  const handleAddMaterial = () => {
    setMaterials([...materials, { materialId: '', price: undefined, minOrder: undefined }]);
  };

  const handleChangeMaterial = (index: number, field: keyof MaterialInput, value: any) => {
    const newMaterials = [...materials];
    newMaterials[index] = { ...newMaterials[index], [field]: value };
    setMaterials(newMaterials);
  };

  const handleRemoveMaterial = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Utama - Info Supplier */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle>Data Supplier</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Nama Supplier */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nama Supplier
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Masukkan nama supplier"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
          </div>

          {/* Kontak */}
          <div className="space-y-2">
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
              Kontak
            </label>
            <input
              id="contact"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Masukkan nomor kontak"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="contoh@email.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
          </div>

          {/* Alamat */}
          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Alamat
            </label>
            <textarea
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Masukkan alamat lengkap"
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Card Material */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle>Material Supplier</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {materials.map((mat, idx) => (
            <div key={idx} className="flex items-center gap-3 border p-3 rounded-xl bg-gray-50">
              {/* Combobox Material */}
              <div className="flex-1">
                <MaterialCombobox
                  value={mat.materialId}
                  onChange={(val) => handleChangeMaterial(idx, 'materialId', val)}
                />
              </div>

              {/* Price */}
              <div className="relative w-40">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  Rp
                </span>
                <input
                  type="number"
                  min={0}
                  placeholder="Harga"
                  value={mat.price ?? ''}
                  onChange={(e) =>
                    handleChangeMaterial(
                      idx,
                      'price',
                      e.target.value === '' ? undefined : parseFloat(e.target.value)
                    )
                  }
                  className="w-full pl-8 px-2 py-1 text-sm border border-gray-300 rounded-lg focus:border-purple-500 outline-none"
                />
              </div>

              {/* Min Order */}
              <input
                type="number"
                min={0}
                placeholder="Min Order"
                value={mat.minOrder ?? ''}
                onChange={(e) =>
                  handleChangeMaterial(
                    idx,
                    'minOrder',
                    e.target.value === '' ? undefined : parseInt(e.target.value)
                  )
                }
                className="w-28 px-2 py-1 text-sm border border-gray-300 rounded-lg focus:border-purple-500 outline-none"
              />

              {/* Remove */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveMaterial(idx)}
                className="text-red-500 hover:text-red-700 hover:bg-red-100"
              >
                <X size={18} />
              </Button>
            </div>
          ))}

          <div className="flex items-center justify-end">
            <Button type="button" variant="outline" onClick={handleAddMaterial}>
              + Tambah Material
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tombol Simpan */}
      <div className="flex items-center justify-end">
        <Button variant="ndsbutton" disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan'}
        </Button>
      </div>
    </form>
  );
}

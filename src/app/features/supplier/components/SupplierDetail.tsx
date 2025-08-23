'use client';

import { useState, useMemo } from 'react';
import { Supplier } from '@/types/supplier';
import { formatRupiah } from '@/lib/formats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Copy, Check, Package, Coins, Layers3 } from 'lucide-react';

type Props = {
  supplier: Supplier;
};

export default function SupplierDetail({ supplier }: Props) {
  const [copied, setCopied] = useState<string | null>(null);

  const stats = useMemo(() => {
    const count = supplier.materials.length;
    const prices = supplier.materials
      .map((m) => m.price)
      .filter((v): v is number => typeof v === 'number');
    const min = count ? Math.min(...prices) : 0;
    const max = count ? Math.max(...prices) : 0;
    const avg = count ? Math.round(prices.reduce((a, b) => a + b, 0) / count) : 0;

    const minOrders = supplier.materials
      .map((m) => m.minOrder)
      .filter((v): v is number => typeof v === 'number');
    const avgMinOrder = minOrders.length
      ? Math.round(minOrders.reduce((a, b) => a + b, 0) / minOrders.length)
      : 0;

    return { count, min, max, avg, avgMinOrder };
  }, [supplier.materials]);

  const handleCopy = async (text?: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 1200);
    } catch {}
  };

  return (
    <div className="space-y-6">
      {/* Header / Identitas */}
      <Card className="rounded-2xl">
        <CardHeader className="">
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">{supplier.name}</span>
            <span className="text-xs p-2 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              ID: {supplier.id}
            </span>
          </CardTitle>
        </CardHeader>

        {/* Kontak & Alamat */}
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {/* Email */}
          <div className="flex items-start p-3 gap-3 border rounded-xl bg-gray-50">
            <Mail className="h-4 w-4 text-gray-500" />
            <div className="flex-1">
              <div className="text-xs text-gray-500">Email</div>
              <a
                href={supplier.email ? `mailto:${supplier.email}` : '#'}
                className="text-sm font-medium break-all"
              >
                {supplier.email ?? '-'}
              </a>
            </div>
            {supplier.email && (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Copy email"
                onClick={() => handleCopy(supplier.email!)}
                className="shrink-0"
              >
                {copied === supplier.email ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>

          {/* Kontak */}
          <div className="flex items-start p-3 gap-3 border rounded-xl bg-gray-50">
            <Phone className="h-4 w-4 text-gray-500" />
            <div className="flex-1">
              <div className="text-xs text-gray-500">Kontak</div>
              <a
                href={supplier.contact ? `tel:${supplier.contact}` : '#'}
                className="text-sm font-medium"
              >
                {supplier.contact ?? '-'}
              </a>
            </div>
            {supplier.contact && (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Copy phone"
                onClick={() => handleCopy(supplier.contact!)}
                className="shrink-0"
              >
                {copied === supplier.contact ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>

          {/* Alamat */}
          <div className="flex items-start p-3 gap-3 border rounded-xl bg-gray-50 sm:col-span-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500">Alamat</div>
              <p className="text-sm font-medium whitespace-pre-line">{supplier.address ?? '-'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="rounded-2xl">
          <CardContent className="flex items-center p-4 gap-3">
            <Package className="h-6 w-6" />
            <div>
              <div className="text-xs text-gray-500">Total Material</div>
              <div className="text-lg font-semibold">{stats.count}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="flex items-center p-4 gap-3">
            <Coins className="h-6 w-6" />
            <div>
              <div className="text-xs text-gray-500">Harga Termurah • Termahal</div>
              <div className="text-lg font-semibold">
                {stats.count ? `${formatRupiah(stats.min)} • ${formatRupiah(stats.max)}` : '-'}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="flex items-center p-4 gap-3">
            <Layers3 className="h-6 w-6" />
            <div>
              <div className="text-xs text-gray-500">Rata-rata Harga • Min Order</div>
              <div className="text-lg font-semibold">
                {stats.count ? `${formatRupiah(stats.avg)} • ${stats.avgMinOrder || '-'}` : '-'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daftar Material */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle>Material yang Disupply</CardTitle>
        </CardHeader>
        <CardContent>
          {supplier.materials.length === 0 ? (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Package className="h-6 w-6" />
              <span>Belum ada material terkait</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border rounded-lg overflow-hidden">
                <thead className="bg-gray-100 sticky top-0">
                  <tr className="text-left">
                    <th className="p-2 border">Nama Material</th>
                    <th className="p-2 border text-right">Harga</th>
                    <th className="p-2 border text-right">Min Order</th>
                  </tr>
                </thead>
                <tbody>
                  {supplier.materials
                    .slice()
                    .sort((a, b) => a.material.name.localeCompare(b.material.name))
                    .map((m) => (
                      <tr key={m.materialId} className="hover:bg-gray-50">
                        <td className="p-2 border">{m.material.name}</td>
                        <td className="p-2 border text-right">{formatRupiah(m.price)}</td>
                        <td className="p-2 border text-right">{m.minOrder ?? '-'}</td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-medium">
                    <td className="p-2 border text-right">Total</td>
                    <td className="p-2 border text-right">
                      {formatRupiah(supplier.materials.reduce((sum, m) => sum + (m.price || 0), 0))}
                    </td>
                    <td className="p-2 border text-right">
                      {supplier.materials.reduce((sum, m) => sum + (m.minOrder ?? 0), 0) || '-'}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

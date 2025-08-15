'use client';

import Link from 'next/link';

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-orange-500">403</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">Forbidden</h2>
        <p className="mt-2 text-gray-600">Halaman ini tidak tersedia untuk role Anda.</p>

        <div className="mt-6 flex justify-center">
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}

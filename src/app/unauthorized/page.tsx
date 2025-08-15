'use client';

import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-red-500">401</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">Unauthorized</h2>
        <p className="mt-2 text-gray-600">Anda tidak memiliki izin untuk mengakses halaman ini.</p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/signin"
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}

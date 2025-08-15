import { auth } from '@/lib/auth';

export default async function SuperAdminPage() {
  const session = await auth();

  return (
    <div>
      <h1>Hallo Ini Halaman Super Warehouse</h1>
      {JSON.stringify(session)}
    </div>
  );
}

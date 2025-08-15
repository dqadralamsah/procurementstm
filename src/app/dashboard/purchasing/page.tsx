import { auth } from '@/lib/auth';

export default async function SuperAdminPage() {
  const session = await auth();

  return (
    <div>
      <h1>Hallo Ini Halaman Super Purchasing</h1>
      {JSON.stringify(session)}
    </div>
  );
}

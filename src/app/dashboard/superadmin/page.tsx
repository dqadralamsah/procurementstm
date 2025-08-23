import { auth } from '@/lib/auth';

export default async function Page() {
  const session = await auth();

  return (
    <div>
      <h1>Hallo Ini Halaman Super Admin</h1>
      {JSON.stringify(session)}
    </div>
  );
}

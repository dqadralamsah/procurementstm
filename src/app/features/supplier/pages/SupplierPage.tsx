'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import SupplierTable from '../components/SupplierTable';

const rolePathMap: Record<string, string> = {
  SUPER_ADMIN: 'superadmin',
  PURCHASING: 'purchasing',
  WAREHOUSE: 'warehouse',
};

export default function SupplierPage() {
  const { data: session } = useSession();
  const rolePath = session ? rolePathMap[session.user.role] : '';

  return (
    <div className="py-0.5 space-y-8">
      <div className="flex items-center justify-end">
        <Button variant={'ndsbutton'} className="cursor-pointer">
          <Link href={`/dashboard/${rolePath}/suppliers/create`}>+ Create</Link>
        </Button>
      </div>
      <SupplierTable role={rolePath} />
    </div>
  );
}

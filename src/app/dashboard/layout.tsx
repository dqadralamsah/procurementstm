import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { SideNavWrapper } from '@/components/sidenavbar/sidenav-wrapper';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session || session.user.role !== 'SUPER_ADMIN') {
    redirect('/forbidden');
  }

  return (
    <div className="">
      <SideNavWrapper role={session.user.role}>
        <main className="m-4">{children}</main>
      </SideNavWrapper>
    </div>
  );
}

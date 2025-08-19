import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { SideNavWrapper } from '@/components/sidenavbar/sidenav-wrapper';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect('/forbidden');
  }

  return (
    <div className="">
      <SideNavWrapper
        role={session.user.role as keyof typeof import('@/config/navigation').navigationConfig}
      >
        <main className="mx-4 my-6">{children}</main>
      </SideNavWrapper>
    </div>
  );
}

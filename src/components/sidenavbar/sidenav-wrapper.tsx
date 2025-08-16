// src/components/sideNav-wrapper.tsx
'use client';

import { useState } from 'react';
import { navigationConfig } from '@/config/navigation';
import { SideNavMenu } from './sidenav-menu';

type Props = {
  role: keyof typeof navigationConfig;
  children: React.ReactNode;
};

export function SideNavWrapper({ role, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-screen flex overflow-hidden">
      <SideNavMenu role={role} isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="flex-1 mx-2 overflow-y-auto">{children}</main>
    </div>
  );
}

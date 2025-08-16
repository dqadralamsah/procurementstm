// src/components/sideNav-menu.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { navigationConfig } from '@/config/navigation';
import { SideNavButton } from './sidenav-button';
import Logo from '@/../../public/Logo.png';
import { LogOut } from 'lucide-react';

type Props = {
  role: keyof typeof navigationConfig;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};

export function SideNavMenu({ role, isOpen, setIsOpen }: Props) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const navMenu = navigationConfig[role] || [];

  return (
    <aside
      className={`sticky h-screen top-0 flex flex-col p-2 z-45 bg-white shadow-xl overflow-hidden transition-[width] duration-500 ${
        isOpen ? 'w-72' : 'w-16'
      }`}
    >
      <div className="relative w-full flex items-center justify-between py-4 mb-4 border-b border-gray-300">
        <Image
          src={Logo}
          alt="Logo"
          className={`w-[150px] h-[33px] object-contain transition-opacity duration-500  ${
            isOpen ? 'opacity-100' : 'opacity-0 w-0'
          }`}
        />
        <SideNavButton isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      </div>

      {/* Navbar Menu */}
      <nav className="flex flex-col gap-2">
        {navMenu.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center h-12 p-3 gap-4 rounded-xl transition-colors duration-300 whitespace-nowrap ${
              pathname.startsWith(href) ? 'bg-nds-purple1 text-white' : 'hover:bg-purple-200'
            }`}
          >
            <Icon strokeWidth={1.5} size={22} className="flex-none text-center" />
            <span
              className={`text-sm font-medium transition-all duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {label}
            </span>
          </Link>
        ))}
      </nav>

      {/* User Profile & SignOut */}
      <div className="w-full flex items-center p-1 gap-1 mt-auto rounded-xl bg-purple-200">
        {/* Avatar */}
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-500 text-white font-semibold shrink-0">
          <span>{session?.user?.name?.charAt(0).toUpperCase() ?? 'U'}</span>
        </div>

        {/* User info + Sign out */}
        <div
          className={`flex flex-col whitespace-nowrap transition-all duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="text-sm font-medium text-gray-900">{session?.user?.name ?? 'User'}</span>
          <span className="text-xs font-medium text-gray-600">{session?.user.role ?? 'Role'}</span>
        </div>

        {/* Sign Out Icon */}
        <button
          onClick={() => signOut({ callbackUrl: '/signin' })}
          className="p-1 ml-auto transition-colors hover:text-red-500"
        >
          <LogOut size={22} strokeWidth={2} />
        </button>
      </div>
    </aside>
  );
}

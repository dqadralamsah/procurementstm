// src/components/sideNav-button.tsx
'use client';

import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

export function SideNavButton({ isOpen, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle Menu"
      className={cn(
        `w-12 h-12 flex justify-center items-center rounded-xl bg-purple-300 cursor-pointer translate-x-4 transition-transform duration-700 hover:bg-nds-purple1 ${
          isOpen ? 'absolute right-4' : 'absolute right-4'
        }`
      )}
    >
      <ChevronLeft
        size={24}
        strokeWidth={2}
        className={`transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`}
      />
    </button>
  );
}

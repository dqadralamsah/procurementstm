'use client';

import { useEffect, useState } from 'react';
import { Material } from '@/types/material';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function MaterialCombobox({ value, onChange }: Props) {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await fetch('/api/material');
        if (!res.ok) throw new Error('Failed to fetch materials');
        const data = await res.json();
        setMaterials(data);
      } catch (error) {
        console.error('Failed to fetch materials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  const selected = materials.find((m) => m.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className="w-full max-w-96 flex items-center justify-between">
          {selected ? `${selected.name}` : loading ? 'Memuat...' : 'Pilih bahan baku'}
          <ChevronDown size={16} className="ml-2 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 max-h-60 overflow-y-auto">
        <Command shouldFilter>
          <CommandInput placeholder="Cari bahan baku..." />
          <CommandEmpty>Tidak ditemukan</CommandEmpty>
          <CommandGroup>
            {materials.map((m) => (
              <CommandItem
                key={m.id}
                value={m.name}
                onSelect={() => {
                  onChange(m.id);
                  setOpen(false);
                }}
              >
                {m.name} ({m.unit})
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

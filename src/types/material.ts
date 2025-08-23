// untuk relasi di material (pivot ke supplier)
export type MaterialSupplier = {
  supplierId: string;
  price: number;
  minOrder?: number;
  supplier: {
    name: string;
  };
};

// hasil query (buat table/detail)
export type Material = {
  id: string;
  name: string;
  category?: string;
  description?: string;
  price?: number;
  unit?: string;
  stock: number;
  minStock: number;
  maxStock?: number;
  safetyStock?: number;
  status: 'NORMAL' | 'LOW' | 'OUT' | 'OVER'; // enum dari StockStatus
  createdAt: string;
  updatedAt: string;
  suppliers: MaterialSupplier[];
};

// untuk form (create/update)
export type SupplierInput = {
  supplierId: string;
  price?: number;
  minOrder?: number;
};

export type MaterialFormInput = {
  name: string;
  category?: string;
  description?: string;
  price?: number;
  unit?: string;
  stock: number;
  minStock: number;
  maxStock?: number;
  safetyStock?: number;
  status: 'NORMAL' | 'LOW' | 'OUT' | 'OVER';
  suppliers: SupplierInput[];
};

// untuk edit (form + id)
export type MaterialFormInitial = MaterialFormInput & {
  id: string;
};

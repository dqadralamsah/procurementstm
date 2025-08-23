// untuk relasi di supplier
export type SupplierMaterial = {
  materialId: string;
  price: number;
  minOrder?: number;
  material: {
    name: string;
  };
};

// hasil query (buat table/detail)
export type Supplier = {
  id: string;
  name: string;
  contact?: string;
  email?: string;
  address?: string;
  materials: SupplierMaterial[];
};

// untuk form (create/update)
export type MaterialInput = {
  materialId: string;
  price?: number;
  minOrder?: number;
};

export type SupplierFormInput = {
  name: string;
  contact?: string;
  email?: string;
  address?: string;
  materials: MaterialInput[];
};

// untuk edit (form + id)
export type SupplierFormInitial = SupplierFormInput & {
  id: string;
};

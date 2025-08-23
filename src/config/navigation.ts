import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  FileText,
  FileCheck,
  Building2,
} from 'lucide-react';

export const navigationConfig = {
  SUPER_ADMIN: [
    // Dashboard
    { label: 'Dashboard', href: '/dashboard/superadmin', icon: LayoutDashboard },
    { label: 'Request', href: '/dashboard/superadmin/request', icon: FileText },

    // Purchasing related
    { label: 'Purchase Request', href: '/dashboard/superadmin/purchase-request', icon: FileCheck },
    { label: 'Purchase Order', href: '/dashboard/superadmin/purchase-order', icon: ShoppingCart },
    { label: 'Supplier', href: '/dashboard/superadmin/suppliers', icon: Building2 },
    { label: 'Material', href: '/dashboard/superadmin/inventory', icon: Package },

    // Management
    { label: 'User Management', href: '/dashboard/superadmin/users', icon: Users },
  ],

  PURCHASING: [
    { label: 'Dashboard', href: '/dashboard/purchasing', icon: LayoutDashboard },
    { label: 'Purchase Request', href: '/dashboard/purchasing/purchase-request', icon: FileCheck },
    { label: 'Purchase Order', href: '/dashboard/purchasing/orders', icon: ShoppingCart },
    { label: 'Supplier', href: '/dashboard/purchasing/suppliers', icon: Building2 },
    { label: 'Material', href: '/dashboard/purchasing/inventory', icon: Package },
  ],

  WAREHOUSE: [
    { label: 'Dashboard', href: '/dashboard/warehouse', icon: LayoutDashboard },
    { label: 'Request', href: '/dashboard/superadmin/request', icon: FileText },
    { label: 'Material', href: '/dashboard/warehouse/inventory', icon: Package },
  ],
} as const;

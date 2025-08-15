export { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Role-based access control
const rolePaths: Record<string, string> = {
  SUPER_ADMIN: '/dashboard/superadmin',
  PURCHASING: '/dashboard/purchasing',
  WAREHOUSE: '/dashboard/warehouse',
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const getRoleDashboard = (role?: string) => rolePaths[role || ''] || '/';

  // Require authentication for dashboard routes
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // Redirect logged-in users away from /signin based on role
  if (token && pathname === '/signin') {
    return NextResponse.redirect(new URL(getRoleDashboard(token.role), req.url));
  }

  // Check if user has permission for their role
  for (const [role, path] of Object.entries(rolePaths)) {
    if (pathname.startsWith(path) && token?.role !== role) {
      return NextResponse.redirect(new URL('/forbidden', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/signin', '/dashboard/:path*'],
};

import { NextRequest, NextResponse } from 'next/server';
import { validateAdminSession } from '@/lib/admin-auth';

// المسارات المحمية
const protectedRoutes = ['/admin', '/admin/'];

// المسارات المستثناة (صفحة تسجيل الدخول)
const publicRoutes = ['/admin/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // التحقق إذا كان المسار محمياً
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route) && !pathname.startsWith('/admin/login')
  );

  // التحقق إذا كان المسار عاماً
  const isPublicRoute = publicRoutes.some(route => 
    pathname.startsWith(route)
  );

  // إذا كان المسار محمياً، التحقق من الجلسة
  if (isProtectedRoute) {
    const sessionId = request.cookies.get('admin-session')?.value;

    if (!sessionId) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const sessionValidation = await validateAdminSession(sessionId);
    
    if (!sessionValidation.valid) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin-session');
      return response;
    }

    return NextResponse.next();
  }

  if (isPublicRoute) {
    const sessionId = request.cookies.get('admin-session')?.value;
    
    if (sessionId) {
      const sessionValidation = await validateAdminSession(sessionId);
      
      if (sessionValidation.valid) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
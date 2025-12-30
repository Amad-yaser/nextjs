'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { SessionProvider } from '@/components/admin/SessionManager';

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-gray-50 pt-12">
        {children}
      </div>
    );
  }

  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50 pt-12">
        {children}
      </div>
    </SessionProvider>
  );
}
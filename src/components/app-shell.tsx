'use client';

import { usePathname } from 'next/navigation';
import { AppLayout } from './app-layout';
import { PublicLayout } from './public-layout';
import { LocaleProvider } from '@/context/locale-context';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const isDashboardPage = pathname.startsWith('/dashboard');

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isDashboardPage) {
    return <AppLayout>{children}</AppLayout>;
  }

  return (
    <LocaleProvider>
      <PublicLayout>{children}</PublicLayout>
    </LocaleProvider>
  );
}

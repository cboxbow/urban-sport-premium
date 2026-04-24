'use client';

import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/layout/AdminSidebar';

export default function AdminChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-black text-white lg:flex">
      <AdminSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

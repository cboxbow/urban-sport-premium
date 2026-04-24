'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LogOut } from 'lucide-react';
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
      <div className="flex-1">
        <div className="sticky top-0 z-30 flex items-center justify-end gap-3 border-b border-white/8 bg-black/88 px-4 py-4 backdrop-blur-xl lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/65 transition-colors hover:border-white/20 hover:text-white"
          >
            <Home className="h-3.5 w-3.5" />
            Homepage
          </Link>
          <button
            className="inline-flex items-center gap-2 rounded-full border border-[#ffb300]/25 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#ffb300] transition-colors hover:border-[#ffb300]/40 hover:bg-[#ffb300]/10"
            onClick={async () => {
              await fetch('/api/admin/logout', { method: 'POST' });
              window.location.href = '/admin/login';
            }}
          >
            <LogOut className="h-3.5 w-3.5" />
            Disconnect
          </button>
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
}
